export default function findBrowser() {
//   let // Opera 8.0+
//     isOpera =
//       (!!window.opr && !!opr.addons) ||
//       !!window.opera ||
//       navigator.userAgent.indexOf(" OPR/") >= 0;

  let // Firefox 1.0+
    isFirefox = typeof InstallTrigger !== "undefined";

  let // Safari 3.0+ "[object HTMLElementConstructor]"
    isSafari =
      /constructor/i.test(window.HTMLElement) ||
      (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(
        !window["safari"] ||
          (typeof safari !== "undefined" && window["safari"].pushNotification)
      );

  let // Internet Explorer 6-11
    isIE = /*@cc_on!@*/ false || !!document.documentMode;

  let // Edge 20+
    isEdge = !isIE && !!window.StyleMedia;

  let // Chrome 1 - 79
    isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

  let // Edge (based on chromium) detection
    isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;

  let // Blink engine detection
    isBlink = (isChrome ) && !!window.CSS;

  let output = "Detecting browsers by ducktyping:<hr>";
  output += "isFirefox: " + isFirefox + "<br>";
  output += "isChrome: " + isChrome + "<br>";
  output += "isSafari: " + isSafari + "<br>";
//   output += "isOpera: " + isOpera + "<br>";
  output += "isIE: " + isIE + "<br>";
  output += "isEdge: " + isEdge + "<br>";
  output += "isEdgeChromium: " + isEdgeChromium + "<br>";
  output += "isBlink: " + isBlink + "<br>";
  return output;
}
