function getTextWidth(text, font) {
  var canvas =
    getTextWidth.canvas ||
    (getTextWidth.canvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  context.font = font;
  var metrics = context.measureText(text);
  return metrics.width;
}

export default function changeTextareaWidth(textInput,isShow=true) {
  const textInputValue = textInput.value.value||textInput.value;

  //如果是空值
  if(textInputValue.trim()===''){
    return 32;
  }

  const splitText = textInputValue.split("\n")||'';
  const eachLineTextLength = splitText.map((text) => text.length);
  const maxTextLength = Math.max(...eachLineTextLength);
  const maxText = splitText.find((text) => text.length === maxTextLength);

  const htmlWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  // const fontSize = 32;
  let getTextareaComputedStyle = null;
  if(isShow){
    getTextareaComputedStyle = window.getComputedStyle(textInput);
  }else{
    getTextareaComputedStyle = window.getComputedStyle(textInput.value)
  }
  
  const  fontFamily = getTextareaComputedStyle.fontFamily;
  const fontSize = getTextareaComputedStyle.fontSize;

  const textWidth = getTextWidth(maxText, `bold ${fontSize} ${fontFamily}`);
  const finalSize =
    textWidth + 5 > htmlWidth * 0.8 ? htmlWidth * 0.8 : textWidth +(fontSize.replace('px','')/2);

  return finalSize;
}
