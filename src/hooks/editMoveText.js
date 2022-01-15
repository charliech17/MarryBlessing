export default async function (
  textarea,
  top = "5%",
  left = "5%",
  bottom = "null",
) {
  Object.assign(textarea.style, { transition: "all .3s", bottom, top, left });
  
  await setTimeout(() => {
    textarea.style.transition = "none";
    document.body.scrollTop =5;
    window.scroll(0,1);
    
  }, 700);
}
