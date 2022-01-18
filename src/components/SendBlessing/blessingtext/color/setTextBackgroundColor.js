import textBackgroundColor from "./textBackgroundColor.js";
import textColor from "./textColor.js";

export default function setTextBackgroundColor({ store, getTextArea }) {

  const { colorMode, colorIndex, colorPage } =
    store.getters["editText/controlColors"];
  const nowTextColor = textColor[colorPage][colorIndex];
  const nowBackgroundColor = textBackgroundColor[colorPage][colorIndex];


  switch (colorMode) {
    case 0:
      Object.assign(getTextArea().style, {
        backgroundColor: "transparent",
        color: nowTextColor,
      });
      break;
    case 1:
      Object.assign(getTextArea().style, {
        backgroundColor: nowBackgroundColor,
      });
      break;
    case 2:
      Object.assign(getTextArea().style, {
        backgroundColor: nowTextColor,
        color: nowBackgroundColor,
      });
      break;
  }
}
