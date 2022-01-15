//initial objects
export default function initialShowInputsParameters({isCahngeSize,blessingStyle}){
    if (isCahngeSize.value) {
        // isCahngeSize.value = false;
        return {
          fontSize: "2rem",
          top: "5%",
          left: "5%",
          bottom: "null",
          position: "absolute",
          width: blessingStyle.width,
          height: blessingStyle.height,
          color: blessingStyle.color,
        };
      } else {
        return {
          fontSize: "2rem",
          left: blessingStyle.left,
          top: blessingStyle.top,
          bottom: blessingStyle.bottom,
          position: "absolute",
          width: blessingStyle.width,
          height: blessingStyle.height,
          color: blessingStyle.color,
        };
      }
}