/* disable eslint for the configuration vars */
/* eslint-disable no-undef, no-redeclare, no-use-before-define */
if (typeof AUTO_TITLE !== 'undefined' && AUTO_TITLE === true) {
    document.title = location.hostname;
}

if (typeof S3_REGION !== 'undefined') {
    var BUCKET_URL = `http://${location.hostname}.${S3_REGION}.amazonaws.com`; // e.g. just 's3' for us-east-1 region
    var BUCKET_WEBSITE_URL = `${location.protocol}//${location.hostname}`;
}

if (typeof S3BL_IGNORE_PATH === 'undefined' || S3BL_IGNORE_PATH !== true) {
    var S3BL_IGNORE_PATH = false;
}

if (typeof BUCKET_URL === 'undefined') {
    var BUCKET_URL = `${location.protocol}//${location.hostname}`;
}

if (typeof BUCKET_NAME !== 'undefined') {
    // if bucket_url does not start with bucket_name, assume path-style url
    if (!~BUCKET_URL.indexOf(`${location.protocol}//${BUCKET_NAME}`)) {
        BUCKET_URL += `/${BUCKET_NAME}`;
    }
}

if (typeof BUCKET_WEBSITE_URL === 'undefined') {
    var BUCKET_WEBSITE_URL = BUCKET_URL;
}

if (typeof S3B_ROOT_DIR === 'undefined') {
    var S3B_ROOT_DIR = '';
}

if (typeof S3B_SORT === 'undefined') {
    var S3B_SORT = 'DEFAULT';
}

if (typeof EXCLUDE_FILE === 'undefined') {
    var EXCLUDE_FILE = '';
}
/* eslint-enable no-undef, no-redeclare, no-use-before-define */
function createS3QueryUrl (marker) {
    let s3RestUrl = BUCKET_URL;
    s3RestUrl += '?delimiter=/';

    //
    // Handling paths and prefixes:
    //
    // 1. S3BL_IGNORE_PATH = false Uses the pathname {bucket}/{path} => prefix =
    // {path}
    //
    // 2. S3BL_IGNORE_PATH = true Uses ?prefix={prefix}
    //
    // Why both? Because we want classic directory style listing in normal buckets
    // but also allow deploying to non-buckets
    //

    const rx = `.*[?&]prefix=${S3B_ROOT_DIR}([^&]+)(&.*)?$`;
    var prefix = '';
    if (S3BL_IGNORE_PATH === false) {
        prefix = location.pathname.replace(/^\//, S3B_ROOT_DIR);
    }
    const match = location.search.match(rx);
    if (match) {
        prefix = S3B_ROOT_DIR + match[1];
    } else if (S3BL_IGNORE_PATH) {
        prefix = S3B_ROOT_DIR;
    }
    if (prefix) {
        // make sure we end in /
        prefix = `${prefix.replace(/\/$/, '')}/`;
        s3RestUrl += `&prefix=${prefix}`;
    }
    if (marker) {
        s3RestUrl += `&marker=${marker}`;
    }
    return s3RestUrl;
}

function bytesToHumanReadable (sizeInBytes) {
    let i = -1;
    const units = [' kB', ' MB', ' GB'];
    do {
        sizeInBytes = sizeInBytes / 1024;
        i++;
    } while (sizeInBytes > 1024);
    return Math.max(sizeInBytes, 0.1).toFixed(1) + units[i];
}

function getInfoFromS3Data (xml) {
    const files = $.map(xml.find('Contents'), item => {
        item = $(item);
        // clang-format off
        return {
            Key: item.find('Key').text(),
            LastModified: item.find('LastModified').text(),
            Size: bytesToHumanReadable(item.find('Size').text()),
            Type: 'file'
        };
        // clang-format on
    });
    const directories = $.map(xml.find('CommonPrefixes'), item => {
        item = $(item);
        // clang-format off
        return {Key: item.find('Prefix').text(), LastModified: '', Size: '0', Type: 'directory'};
        // clang-format on
    });
    var nextMarker = null;
    if ($(xml.find('IsTruncated')[0]).text() === 'true') {
        nextMarker = $(xml.find('NextMarker')[0]).text();
    }
    // clang-format off
    return {
        files: files,
        directories: directories,
        prefix: $(xml.find('Prefix')[0]).text(),
        nextMarker: encodeURIComponent(nextMarker)
    };
    // clang-format on
}

// This will sort your file listing by most recently modified. Flip the
// comparator to '>' if you want oldest files first.
function sortFunction (a, b) {
    switch (S3B_SORT) {
    case 'OLD2NEW':
        return a.LastModified > b.LastModified ? 1 : -1;
    case 'NEW2OLD':
        return a.LastModified < b.LastModified ? 1 : -1;
    case 'A2Z':
        return a.Key < b.Key ? 1 : -1;
    case 'Z2A':
        return a.Key > b.Key ? 1 : -1;
    case 'BIG2SMALL':
        return a.Size < b.Size ? 1 : -1;
    case 'SMALL2BIG':
        return a.Size > b.Size ? 1 : -1;
    }
}

function buildNavigation (info) {
    const root = `<a href="?prefix=">${BUCKET_WEBSITE_URL}</a> / `;
    if (info.prefix) {
        let processedPathSegments = '';
        const content = $.map(info.prefix.split('/'), pathSegment => {
            processedPathSegments = `${processedPathSegments + encodeURIComponent(pathSegment)}/`;
            return `<a href="?prefix=${processedPathSegments}">${pathSegment}</a>`;
        });
        $('#navigation').html(root + content.join(' / '));
    } else {
        $('#navigation').html(root);
    }
}

function renderRow (item) {
    let row = '<tr>';
    if (item.Type === 'directory') {
        row += '<td class="type-icon"><img src="folder.png" /></td>';
    } else {
        row += '<td class="type-icon"></td>';
    }
    row += `<td><a href="${item.href}">${item.keyText}</a></td>`;
    if (item.Type === 'directory') {
        row += '<td></td>';
    } else {
        row += `<td>${item.Size}</td>`;
    }
    row += `<td>${item.LastModified}</td></tr>\n`;
    return row;
}

// info is object like: {    files: ..    directories: ..    prefix: ... }
function prepareTable (info) {
    let files = info.files.concat(info.directories);
    let prefix = info.prefix;
    const content = [];
    // add ../ at the start of the dir listing, unless we are already at root dir
    if (prefix && prefix !== S3B_ROOT_DIR) {
        let up = prefix.replace(/\/$/, '')
            .split('/')
            .slice(0, -1)
            .concat('')
            .join('/'); // one directory up
        let item = {
            Key: up,
            LastModified: '',
            Size: '',
            keyText: '../',
            href: S3BL_IGNORE_PATH ?
                `?prefix=${up}` :
                '../'
        };
        let row = renderRow(item);
        content.push(`${row}\n`);
    }

    jQuery.each(files, (idx, item) => {
        // strip off the prefix
        item.keyText = item.Key.substring(prefix.length);
        if (item.Type === 'directory') {
            if (S3BL_IGNORE_PATH) {
                item.href = `${location.protocol}//${location.hostname}${location.pathname}?prefix=${item.Key}`;
            } else {
                item.href = item.keyText;
            }
        } else {
            item.href = `${BUCKET_WEBSITE_URL}/${encodeURIComponent(item.Key)}`;
            item.href = item.href.replace(/%2F/g, '/');
        }
        const row = renderRow(item);
        if (EXCLUDE_FILE !== item.Key) {
            content.push(`${row}\n`);
        }
    }
    );
    return content.join('');
}

function getS3Data (marker, html) {
    const s3RestUrl = createS3QueryUrl(marker);
    // set loading notice
    $('#listing').html('<img src="loading.gif" />');
    $.get(s3RestUrl).done(data => {
        // clear loading notice
        $('#listing').html('');
        const xml = $(data);
        const info = getInfoFromS3Data(xml);

        // Slight modification by FuzzBall03 This will sort your file listing based on
        // var S3B_SORT See url for example:
        // http://esp-link.s3-website-us-east-1.amazonaws.com/
        if (S3B_SORT !== 'DEFAULT') {
            const sortedFiles = info.files;
            sortedFiles.sort(sortFunction);
            info.files = sortedFiles;
        }

        buildNavigation(info);

        html = typeof html === 'undefined' ?
            prepareTable(info) :
            html + prepareTable(info);
        if (info.nextMarker === 'null') {
            document.getElementById('listing').innerHTML = html;
        } else {
            getS3Data(info.nextMarker, html);
        }
    })
        .fail(error => {
            console.error(error); // eslint-disable-line no-console
            $('#listing').html(`<strong>Error: ${error}</strong>`);
        });
}

jQuery($ => { // eslint-disable-line no-unused-vars
    getS3Data();
});
