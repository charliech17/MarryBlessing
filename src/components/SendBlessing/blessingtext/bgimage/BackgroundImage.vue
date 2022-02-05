<template>
  <img
    class="show_bg_image"
    ref="bgImage"
    v-if="inputType === 'image'"
    @touchstart="handlePointerStart($event)"
  />
  <video class="show_bg_image" v-else ref="bgVideo" autoplay @touchstart="handlePointerStart($event)"></video>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core"; //,watch
import { useStore } from "vuex";
// import ColorThief from 'https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js';
// import { useRouter } from 'vue-router';

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

    let uploadedFile = "";

    //1. 當載入頁面時 去看檔案是video 或 image 並設定src
    onMounted(() => {
      if (!inputImage.value.newInput) return;
// let recaptchaScript = document.createElement('script')
//       recaptchaScript.setAttribute('src', 'https://cdnjs.cloudflare.com/ajax/libs/color-thief/2.3.0/color-thief.umd.js')
//       document.head.appendChild(recaptchaScript)

      // const colorThief = new ColorThief();
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        uploadedFile = reader.result;
        if (inputType.value === "image") {
          bgImage.value.src = `${uploadedFile}`;
          // console.log(colorThief.getColor(bgImage.value));
          
        } else {
          bgVideo.value.src = `${uploadedFile}`;
        }


        document.getElementById('canvas').style.backgroundColor;
      });
      reader.readAsDataURL(inputImage.value.inputFile.files[0]);
      store.dispatch("addphoto/tellImageInput", {
        newInput: false,
        inputFile: null,
      });
    });

    // const start = { x: 0, y: 0, distance: 0 };
    let imageElementScale = 1;

  let start = {};

  // Calculate distance between two fingers
  const distance = (event) => {
    return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
  };
    //2. 設定touch event

    //2-1 touch start
    function handlePointerStart(event) {
      // console.log(event.touches);
      const imageElement = event.target;

      if (event.touches.length === 2) {
        event.preventDefault(); // Prevent page scroll

        // Calculate where the fingers have started on the X and Y axis
        start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
        start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
        start.distance = distance(event);
      }
      //在開始觸摸時加入touchmove event
      event.target.addEventListener("touchmove", (event) => {
        handlePointerMove(event,imageElement);
      });

      event.target.addEventListener("touchup", () => {
        handlePointerEnd(imageElement);
      });
    }

    //2-2 touch move
    function handlePointerMove(event,imageElement) {
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
        // imageElement.style.zIndex = "0";
      }
    }

    //2-3 touch end
    function handlePointerEnd(imageElement) {
      imageElement.style.transform = "";
      imageElement.style.WebkitTransform = "";
      imageElement.style.zIndex = "";
    }

    return {
      bgImage,
      bgVideo,
      inputType,
      handlePointerStart,
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
