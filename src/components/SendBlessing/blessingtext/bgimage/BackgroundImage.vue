<template>
  <img
    class="show_bg_image"
    ref="bgImage"
    v-if="inputType === 'image'"
    @touchstart="handlePointerStart($event)"
    @load="handleFileLoaded('image')"
  />
  <video
    class="show_bg_image"
    v-else
    ref="bgVideo"
    autoplay
    playsinline
    @touchstart="handlePointerStart($event)"
    @load="handleFileLoaded('video')"
  ></video>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import {  onMounted } from "@vue/runtime-core"; //,watch
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    // const router = useRouter();
    const inputImage = computed(() => store.getters["addphoto/getInputStatus"]);
    const inputType = computed(
      () => store.getters["addphoto/getStateItem"].inputType
    );

    const bgImage = ref("");
    const bgVideo = ref("");

    // let uploadedFile = "";

    //1. 當載入頁面時 去看檔案是video 或 image 並設定src
    onMounted(() => {
      if (!inputImage.value.newInput) return;

      // const reader = new FileReader();
      // reader.addEventListener("load", () => {
      //   uploadedFile = reader.result;
      //   console.log(reader);
      //   if (inputType.value === "image") {
      //     // const result =  analyze(uploadedFile);
      //     // console,log(result[0].color);
      //     getbackgroundColor(uploadedFile);
      //     bgImage.value.src = `${uploadedFile}`;
      //   } else {
      //     bgVideo.value.src = `${uploadedFile}`;
      //   }

      //   document.getElementById("canvas").style.backgroundColor;
      // });
      // reader.readAsDataURL(inputImage.value.inputFile.files[0]);
      let URL = window.URL || window.webkitURL;
      let fileURL = URL.createObjectURL(inputImage.value.inputFile.files[0]);

      try {
        bgImage.value.src = fileURL;
      } catch (err) {
        bgVideo.value.src = fileURL;
      }

      // getbackgroundColor(fileURL);

      store.dispatch("addphoto/tellImageInput", {
        newInput: false,
        inputFile: null,
      });
    });

    //處理image load
    function handleFileLoaded(inputType){
      //設定更改背景的element
      let changeBackgroundElement = inputType === 'image' ? bgImage.value : bgVideo.value;  
      console.log(getAverageRGB(changeBackgroundElement));
    }


    let imageElementScale = 1;
    let start = {};

    const distance = (event) => {
      return Math.hypot(
        event.touches[0].pageX - event.touches[1].pageX,
        event.touches[0].pageY - event.touches[1].pageY
      );
    };
    //2. 設定touch event

    //2-1 touch start
    function handlePointerStart(event) {
      // console.log(event.touches);
      const imageElement = event.target;

      if (event.touches.length === 2) {
        event.preventDefault(); // Prevent page scroll

        start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
        start.distance = distance(event);
      }
      //在開始觸摸時加入touchmove event
      event.target.addEventListener("touchmove", (event) => {
        handlePointerMove(event, imageElement);
      });

      event.target.addEventListener("touchup", () => {
        handlePointerEnd(imageElement);
      });
    }

    //2-2 touch move
    function handlePointerMove(event, imageElement) {
      if (event.touches.length === 2) {
        event.preventDefault(); // Prevent page scroll

        // Safari provides event.scale as two fingers move on the screen
        // For other browsers just calculate the scale manually
        let scale;
        if (event.scale) {
          scale = event.scale;
        } else {
          const deltaDistance = distance(event);
          scale = deltaDistance / start.distance;
        }
        imageElementScale = Math.min(Math.max(0.8, scale), 4);

        // Calculate how much the fingers have moved on the X and Y axis
        const deltaX =
          ((event.touches[0].pageX + event.touches[1].pageX) / 2 - start.x) * 2; // x2 for accelarated movement
        const deltaY =
          ((event.touches[0].pageY + event.touches[1].pageY) / 2 - start.y) * 2; // x2 for accelarated movement

        // Transform the image to make it grow and move with fingers
        const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
        imageElement.style.transform = transform;
        imageElement.style.WebkitTransform = transform;
      }
    }

    //2-3 touch end
    function handlePointerEnd(imageElement) {
      imageElement.style.transform = "";
      imageElement.style.WebkitTransform = "";
      imageElement.style.zIndex = "";
    }

    function getAverageRGB(imgEl) {
      var blockSize = 5, // only visit every 5 pixels
        defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
        canvas = document.createElement("canvas"),
        context = canvas.getContext && canvas.getContext("2d"),
        data,
        width,
        height,
        i = -4,
        length,
        rgb = { r: 0, g: 0, b: 0 },
        count = 0;

      if (!context) {
        return defaultRGB;
      }

      height = canvas.height =
        imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
      width = canvas.width =
        imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

      context.drawImage(imgEl, 0, 0);

      try {
        data = context.getImageData(0, 0, width, height);
      } catch (e) {
        /* security error, img on diff domain */
        return defaultRGB;
      }

      length = data.data.length;

      while ((i += blockSize * 4) < length) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i + 1];
        rgb.b += data.data[i + 2];
      }

      // ~~ used to floor values
      rgb.r = ~~(rgb.r / count);
      rgb.g = ~~(rgb.g / count);
      rgb.b = ~~(rgb.b / count);

      return rgb;
    }

    return {
      bgImage,
      bgVideo,
      inputType,
      handlePointerStart,
      handleFileLoaded
    };
  },
};
</script>

<style scoped>
.show_bg_image {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-width: 1200px;
  /* background-position: center;
  background-size: contain;
  background-repeat: no-repeat; */
  z-index: 0;
}
</style>
