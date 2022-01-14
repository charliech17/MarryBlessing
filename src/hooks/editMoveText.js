export default function(textarea,top="5%",left="5%",bottom="null"){
    // console.log(textarea);
    textarea.style.transition = "all .5s";
    textarea.style.bottom = bottom;
    textarea.style.top = top;
    textarea.style.left = left;
    window.scroll(0,0);

    setTimeout(() => {
      textarea.style.transition = "none";
      window.scroll(0,0);
    }, 600);
    console.log(textarea,top,left,bottom);
}