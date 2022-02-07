export default function getHtmlWidthAndHeight() {
    const htmlWidth =
      (window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth) / 100;

    const htmlHeight =
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight) / 100;

    return { htmlWidth, htmlHeight };
  }