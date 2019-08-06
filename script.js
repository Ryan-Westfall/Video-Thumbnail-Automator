const gm = require('gm').subClass({ imageMagick: true });
const Border = "./images/Border.png";
const FILL_WHITE = "#FFFFFF";
const OUTLINE_PURPLE = "#7a359d";

//File workflow
const image_path = "./images/Marfan pic.png";
const image_text = "./temp/imageText.png"
const image_temp = "./temp/placeholder.png";
const image_output = "./finished/done.png";

//Editable fields
const text = "Whiskers was \nSyndrome";
const FONT_STYLE = "./Neuzeit Grotesk Bold.ttf";
const STROKE_WIDTH = 8;
const FONT_SIZE = 150;
const TEXT_BLUR = "10x10";

//Text Creation
gm(1280,720, "white")
  .gravity('Center')
  .transparent("white")
  .fontSize(FONT_SIZE)
  .font(FONT_STYLE)
  .stroke("black", STROKE_WIDTH)
  .drawText(0, 0, text)
  .blur(TEXT_BLUR)
  .stroke(OUTLINE_PURPLE, STROKE_WIDTH)
  .fill(FILL_WHITE)
  .drawText(0,0,text)
    .write(image_text, (error) => {
      let condition = (!error) ? ("Text Creation Works") : (error)
      buildFrame();
      console.log(condition)
    })

//Image and Border Composite
buildFrame = () => {
gm(image_path)
    .composite(Border)
    .write(image_temp, (error) => {
      let condition = (!error) ? ("Image and Border Composite Works") : (error)
      outputImage();
      console.log(condition)
    })
  }

//Image and Border and Text
outputImage = () => {
gm(image_temp)
    .composite(image_text)
    .write(image_output, (error) => {
      let condition = (!error) ? ("Program Successful") : (error)
      console.log(condition)
    })
  }









