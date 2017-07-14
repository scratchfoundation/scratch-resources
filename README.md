# scratch-resources
Source files and images for translators to translate Scratch materials, published
files for www.

## For Translators ##
This repository contains the input source files for Scratch resources like the
[Scratch Activity Cards](https://resources.scratch.mit.edu/www/cards/en/ScratchCardsAll.pdf), 
and the published translations that are available on the new scratch website ([scratch-www](https://github.com/LLK/scratch-www))

The source files are also available at https://resources.scratch.mit.edu/index.html.

### Directory structure ###
All the source files can be found within the `resources/source` directory. Within that directory there are:
* cards/: The source files for the set of Scratch Activity Cards published in 2016.
  * InDesign-files: The inDesign source files for each set of cards. On the resources server there are zip archives corresponding to each set of cards so you don't have to download the files individually.
  * Powerpoint-files: Each of the card sets in powerpoint format for translators who do not have access to Adobe inDesign.
* guides/: The source files for the set of Scratch Activity Guides published in 2016.
  * InDesign-files: The inDesign source files for each Guide. On the resources server there are zip archives corresponding to each guide so you don't have to download the files individually.
  * Powerpoint-files: Each guide in powerpoint format for translators who do not have access to Adobe inDesign.
* OriginalCards/: The Adobe Illustrator source files for the original set of Scratch 2.0 Getting Started Cards

### Workflow ###
If you are comfortable with github, forking repositories, and making pull requests, you can fork this repository and submit a 
pull request with your translated files. 

On github, translated files for publication should be put in the appropriate language directory within the `www` directory. The file also needs to have the same name as the original resource. For example, if you have a French translation of the 
Catch Game Cards from the Activity Cards set, you would add your PDF file to `/www/cards/fr` with the name `catchCards.pdf`.

**If you're not comfortable with github etc.**, You can download source files you want to translate from
https://resources.scratch.mit.edu/index.html. When you have a finished PDF file, send the file (or a link to a shared folder)
to translate@scratch.mit.edu. 
