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

  //selected color and clear last color
  //page 也要
  // document.body.querySelector(`.color_bar`).children.item(colorIndex).style.border = '.2rem solid';
  // document.body.querySelector(`.color_bar`).children.item(lastSelectedIndex).style.border = '2px solid';
  // store.dispatch('editText/updateSelectedIndex',colorIndex);
  // console.log(colorIndex,lastSelectedIndex);

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
