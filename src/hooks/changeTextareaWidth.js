function getTextWidth(text, font) {
  var canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

export default function changeTextareaWidth(textInput) {
  const textInputValue = textInput.value.value;
  const splitText = textInputValue.split("\n");
  const eachLineTextLength = splitText.map((text) => text.length);
  const maxTextLength = Math.max(...eachLineTextLength);
  const maxText = splitText.find((text) => text.length === maxTextLength);

  const htmlWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const fontSize = 32;
  const textWidth = getTextWidth(maxText, `bold ${fontSize}px arial`);
  const finalSize =
    textWidth + 5 > htmlWidth * 0.8 ? htmlWidth * 0.8 : textWidth + 10;

  return finalSize;
}
