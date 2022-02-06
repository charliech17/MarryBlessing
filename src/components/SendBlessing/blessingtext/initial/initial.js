//initial objects
export default function initialShowInputsParameters({isChangeSize,blessingStyle}){
  if (isChangeSize.value) {
        // isCahngeSize.value = false;
        return {
          fontSize: "2rem",
          top: "5%",
          left: "5%",
          // bottom: "null",
          position: "absolute",
          width: blessingStyle.width,
          height: blessingStyle.height,
          color: blessingStyle.color,
          backgroundColor:blessingStyle.backgroundColor
        };
      } else {
        return {
          fontSize: "2rem",
          left: blessingStyle.left,
          top: blessingStyle.top,
          // bottom: blessingStyle.bottom,
          position: "absolute",
          width: blessingStyle.width,
          height: blessingStyle.height,
          color: blessingStyle.color,
          backgroundColor:blessingStyle.backgroundColor
        };
      }
}