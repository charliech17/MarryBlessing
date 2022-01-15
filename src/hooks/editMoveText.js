export default async function (
  textarea,
  top = "5%",
  left = "5%",
  bottom = "null",
) {
  Object.assign(textarea.style, { transition: "all .3s", bottom, top, left });
  // body.style.
  document.body.scrollTop =0;
  window.scroll(0,0);
  // window.scrollTo(0,0);
  
  await setTimeout(() => {
    textarea.style.transition = "none";
    window.scroll(0,0);
    document.body.scrollTop =5;
    // console.log(document.body.scrollTop);
    // textarea.tabIndex = textarea.value.length;
    // textarea.setAttribute("tabindex", textarea.value.length);

    // setTimeout(() => {
    //   if (!moveback) {
    //     textarea.focus();
    //     textarea.setAttribute("tabindex", textarea.value.length);
    //     return;
    //   } else {
    //     textarea.removeAttribute("tabindex");
    //   }
    // }, 700);

    // textarea.readOnly = true;
    // textarea.tabIndex = textarea.value.length;

    // textarea.setAttribute('tabindex',textarea.value.length);
  }, 350);
}
