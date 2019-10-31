const path = require('path');
const fs = require('fs');

const drawer = require('./lib/drawer');

const createOgImage = (imageToStampPath, textToAdd, fontSize, savePath) => {
  return new Promise((resolve, reject) => {
    const WHITE = '#FFFFFF';
    const PURPLE = '#7a359d';
    const SHADOW_BLACK = '#000000CC';
    const SHADOW_BLUR = '10x10';

    const FONT_PATH = path.resolve(__dirname, './fonts/Neuzeit Grotesk Bold.ttf');
    const FRAME_BORDER_PATH = path.resolve(__dirname, './images/frame-border.png');
    const TMP_IMAGE_PATH = path.resolve(__dirname, './tmp/tmp-image.png');

    const IMAGE_WIDTH = 1280;
    const IMAGE_HEIGHT = 720;
    const FINAL_WIDTH = parseInt(IMAGE_WIDTH/2);
    const FINAL_HEIGHT = parseInt(IMAGE_HEIGHT/2);

    const STROKE_WIDTH = 16;

    drawer.createBlankImage(TMP_IMAGE_PATH, IMAGE_WIDTH, IMAGE_HEIGHT)
      .then(imagePath => drawer.addTextShadow(imagePath, textToAdd, fontSize, FONT_PATH, STROKE_WIDTH, SHADOW_BLACK, SHADOW_BLUR))
      .then(imagePath => drawer.addTextStroke(imagePath, textToAdd, fontSize, FONT_PATH, STROKE_WIDTH, PURPLE))
      .then(imagePath => drawer.addTextFill(imagePath, textToAdd, fontSize, FONT_PATH, WHITE))
      .then(imagePath => drawer.addFrameBorder(imagePath, FRAME_BORDER_PATH))
      .then(imagePath => drawer.combineImages(imageToStampPath, imagePath, savePath))
      .then(imagePath => drawer.resizeImage(imagePath, FINAL_WIDTH, FINAL_HEIGHT))
      .then(imagePath => {
        fs.unlinkSync(TMP_IMAGE_PATH);
        resolve(imagePath);
      });
  });
};

createOgImage("./images/cat.jpeg", "Hello", 14, "./images/item.png");


module.exports = createOgImage;
