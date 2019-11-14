# scratch-resources
Source files and images for translators to translate Scratch materials, published
files for www.

## For Scratch Team ##
After updating any content to be published make sure to flush the fastly cache so that new versions are served, as the resources are cached aggressively.

## For Translators ##
This repository contains the input source files for Scratch resources like the
[Scratch Activity Cards](https://resources.scratch.mit.edu/www/cards/en/ScratchCardsAll.pdf),
and the published translations that are available on the new scratch website ([scratch-www](https://github.com/LLK/scratch-www))

### Location of the Source Files ###
All the source files can be found within the `resources/source` directory. Within that directory there are:
* cards/: The source files for the set of Scratch 3.0 Activity Cards.
  * [InDesign-files](https://github.com/LLK/scratch-resources/tree/master/resources/source/cards/InDesign-files): The inDesign source files for each set of cards. There are zip files for each set of cards so that you do not have to download the files individually:
    * [01_AnimateName.zip](https://scratch-resources.s3.amazonaws.com/source/cards/InDesign-files/01_AnimateName.zip)
    * [02_Character.zip](https://scratch-resources.s3.amazonaws.com/source/cards/InDesign-files/02_Character.zip)
    * [03_Chase.zip](https://scratch-resources.s3.amazonaws.com/source/cards/InDesign-files/03_Chase.zip)
    * [04_Music.zip](https://scratch-resources.s3.amazonaws.com/source/cards/InDesign-files/04_Music.zip)
    * [05_Story.zip](https://scratch-resources.s3.amazonaws.com/source/cards/InDesign-files/05_Story.zip)
    * [06_Pong.zip](https://scratch-resources.s3.amazonaws.com/source/cards/InDesign-files/06_Pong.zip)
    * [07_Dance.zip](https://scratch-resources.s3.amazonaws.com/source/cards/InDesign-files/07_Dance.zip)
    * [08_Jumping.zip](https://scratch-resources.s3.amazonaws.com/source/cards/InDesign-files/08_Jumping.zip)
    * [09_Virtual-Pet.zip](https://scratch-resources.s3.amazonaws.com/source/cards/InDesign-files/09_Virtual-Pet.zip)
    * [10_Catch.zip](https://scratch-resources.s3.amazonaws.com/source/cards/InDesign-files/10_Catch.zip)
    * [11_VideoSensing.zip](https://scratch-resources.s3.amazonaws.com/source/cards/InDesign-files/11_VideoSensing.zip)

  * [Powerpoint-files](https://github.com/LLK/scratch-resources/tree/master/resources/source/cards/Powerpoint-files): Each of the card sets in powerpoint format for translators who do not have access to Adobe inDesign.
* guides/: The source files for the set of Scratch Activity Guides.
  * [InDesign-files](https://github.com/LLK/scratch-resources/tree/master/resources/source/guides/InDesign-files): The inDesign source files for each Guide. There are zip archives corresponding to each guide so you don't have to download the files individually:
    * [CatchEducatorGuide.zip](https://scratch-resources.s3.amazonaws.com/source/guides/InDesign-files/CatchEducatorGuide.zip)
    * [DanceEducatorGuide.zip](https://scratch-resources.s3.amazonaws.com/source/guides/InDesign-files/DanceEducatorGuide.zip)
    * [FashionEducatorGuide.zip](https://scratch-resources.s3.amazonaws.com/source/guides/InDesign-files/FashionEducatorGuide.zip)
    * [FlyEducatorGuide.zip](https://scratch-resources.s3.amazonaws.com/source/guides/InDesign-files/FlyEducatorGuide.zip)
    * [Hide-and-Seek-EducatorGuide.zip](https://scratch-resources.s3.amazonaws.com/source/guides/InDesign-files/Hide-and-Seek-EducatorGuide.zip)
    * [MusicEducatorGuide.zip](https://scratch-resources.s3.amazonaws.com/source/guides/InDesign-files/MusicEducatorGuide.zip)
    * [NameEducatorGuide.zip](https://scratch-resources.s3.amazonaws.com/source/guides/InDesign-files/NameEducatorGuide.zip)
    * [PetEducatorGuide.zip](https://scratch-resources.s3.amazonaws.com/source/guides/InDesign-files/PetEducatorGuide.zip)
    * [PongEducatorGuide.zip](https://scratch-resources.s3.amazonaws.com/source/guides/InDesign-files/PongEducatorGuide.zip)
    * [RaceGameEducatorGuide.zip](https://scratch-resources.s3.amazonaws.com/source/guides/InDesign-files/RaceGameEducatorGuide.zip)
    * [Story-EducatorGuide.zip](https://scratch-resources.s3.amazonaws.com/source/guides/InDesign-files/Story-EducatorGuide.zip)
  * [Powerpoint-files](https://github.com/LLK/scratch-resources/tree/master/resources/source/guides/Powerpoint-files): Each guide in powerpoint format for translators who do not have access to Adobe inDesign.
* [Old Scratch 2 Starter Cards](https://github.com/LLK/scratch-resources/tree/master/resources/source/cards-old-scratch2/older-starter-cards): The Adobe Illustrator source files for the original set of Scratch 2 Getting Started Cards

### Workflow ###
**If you are comfortable with github**, forking repositories, and making pull requests, you can fork this repository and submit a
pull request with your translated files.

On github, translated files for publication should be put in the appropriate language directory within the [`www` directory](https://github.com/LLK/scratch-resources/tree/master/resources/www). The file also needs to have the same name as the original resource. For example, if you have a French translation of the
Catch Game Cards from the Activity Cards set, you would add your PDF file to `resources/www/cards/fr` with the name `catch-cards.pdf`. Check the names in the [`/en` folder](https://github.com/LLK/scratch-resources/tree/master/resources/www/cards/en) to see what the original file names.

To test, run `npm run localize` and then look at the generated `resources/localized-urls.json` file to see if the new cards have been properly added. This requires Node v6.

To make updating translations easier, you can add your translated source files to the appropriate language directory in `resources/source/translations`. For example, if you have an ODP file for the French translation of Catch Game, you can add it to `resources/source/translations/fr/cards` with the name `catch-cards.odp`. You may need to create the folder for your language.

**If you're not comfortable with github**, You can download source files you want to translate from
the links above. When you have a finished PDF file, send the file (or a link to a shared folder)
to translate@scratch.mit.edu.
