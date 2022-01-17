import textBackgroundColor from "./textBackgroundColor.js";
import textColor from "./textColor.js";

export default function setTextBackgroundColor({ store, getTextArea }) {
  //,getTextArea
//   if (getTextArea().id === "root") {
//     store.dispatch("editText/changeColorMode");
//   }

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
  // console.log(store.getters['editText/controlColors']);

  // console.log(colorMode);
  // if(colorMode<= 0||colorMode===3){
  //     //把它歸正為0
  //     store.dispatch('editText/changeColorMode',true);
  //     Object.assign(getTextArea().style,{backgroundColor: 'transparent',color:nowTextColor})
  //     //存在blessingStyle中
  //     return;
  // }
  // console.log(colorMode,colorIndex,colorPage);

  // console.log(nowBackgroundColor);

  // // console.log(getTextArea());
  // console.log(nowTextColor,nowBackgroundColor);

  // switch(colorMode){
  //     case 1:
  //         Object.assign(getTextArea().style,{backgroundColor: nowBackgroundColor})
  //         break;
  //     case 2:
  //         Object.assign(getTextArea().style,{backgroundColor: nowTextColor,color:nowBackgroundColor})
  //         break
  // }
}
