const gm = require('gm').subClass({ imageMagick: true });

drawer = {};

drawer.createBlankImage = (_imagePath, _width, _height) => {
  return new Promise((resolve, reject) => {
    gm(_width, _height, 'white')
      .transparent('white')
      .write(_imagePath, (e) => {
        if(e) reject(e);
        resolve(_imagePath);
      });
  });
};

drawer.addImage = (_imagePath, _imageToAddPath) => {
  return new Promise((resolve, reject) => {
    gm(_imagePath)
      .composite(_imageToAddPath)
      .write(_imagePath, (e) => {
        if(e) reject(e);
        resolve(_imagePath);
      });
  });
};

drawer.addTextStroke = (_imagePath, _textToAdd, _fontSize, _fontPath, _strokeWidth, _color) => {
  return new Promise((resolve, reject) => {
    gm(_imagePath)
      .gravity('Center')
      .fontSize(_fontSize)
      .font(_fontPath)
      .stroke(_color, _strokeWidth)
      .fill(_color)
      .drawText(0, 0, _textToAdd)
      .write(_imagePath, (e) => {
        if(e) reject(e);
        resolve(_imagePath);
      })
  });
};

drawer.addTextShadow = (_imagePath, _textToAdd, _fontSize, _fontPath, _strokeWidth, _color, _blur) => {
  return new Promise((resolve, reject) => {
    gm(_imagePath)
      .gravity('Center')
      .fontSize(_fontSize)
      .font(_fontPath)
      .stroke(_color, _strokeWidth)
      .fill(_color)
      .drawText(0, 0, _textToAdd)
      .blur(_blur)
      .write(_imagePath, (e) => {
        if(e) reject(e);
        resolve(_imagePath);
      })
  });
};


drawer.addTextFill = (_imagePath, _textToAdd, _fontSize, _fontPath, _color) => {
  return new Promise((resolve, reject) => {
    gm(_imagePath)
      .gravity('Center')
      .fontSize(_fontSize)
      .font(_fontPath)
      .drawText(0, 0, _textToAdd)
      .fill(_color)
      .drawText(0, 0, _textToAdd)
      .write(_imagePath, (e) => {
        if(e) reject(e);
        resolve(_imagePath);
      });
  });
}

drawer.addFrameBorder = (_imagePath, _frameBorderPath) => {
  return new Promise((resolve, reject) => {
    gm(_imagePath)
      .composite(_frameBorderPath)
      .write(_imagePath, (e) => {
        if(e) reject(e);
        resolve(_imagePath);
      })
  });
};

drawer.combineImages = (_bottomImagePath, _topImagePath, _savePath) => {
  return new Promise((resolve, reject) => {
    gm(_bottomImagePath)
      .composite(_topImagePath)
      .write(_savePath, (e) => {
        if(e) reject(e);
        resolve(_savePath);
      });
  });
};

drawer.resizeImage = (_imagePath, _newWidth, _newHeight) => {
  return new Promise((resolve, reject) => {
    gm(_imagePath)
      .resize(_newWidth, _newHeight)
      .write(_imagePath, (e) => {
        if(e) reject(e);
        resolve(_imagePath);
      });
  });
};

module.exports = drawer;
