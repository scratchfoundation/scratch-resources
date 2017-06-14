#!/usr/bin/env bash
# create zip files for all the indesign directories
# assumes that is it run from the root directory

echo "Generating zip files for cards."
for f in ./resources/source/cards/InDesign-files/*/; do
    zip -rq "${f%/}.zip" "$f"
done

echo "Generating zip files for guides."
for f in ./resources/source/guides/InDesign-files/*/; do
    zip -rq "${f%/}.zip" "$f"
done

echo "Finished generating zip files."
