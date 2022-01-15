<template>
   <div class="show_bg_image" ref="bgImage"></div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const inputImage = computed(() => store.getters["addphoto/getInputStatus"]);
    const bgImage = ref("");
    let uploaded_image = "";

    onMounted(() => {
      watch(inputImage, () => {
        if (!inputImage.value.newInput) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          uploaded_image = reader.result;
          console.log(uploaded_image);
          bgImage.value.style.backgroundImage = `url(${uploaded_image})`;
        });
        reader.readAsDataURL(inputImage.value.inputFile.files[0]);
        store.dispatch("addphoto/tellImageInput", {
          newInput: false,
          inputFile: null,
        });
      });
    });

    return {
      bgImage,
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
  background-position: center;
  /* background-size: contain; */
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 0;
  /* transition: 2s; */
}
</style>
