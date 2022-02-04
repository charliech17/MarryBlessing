<template>
  <label class="add_photos">
    <div><img :src="imageSrc" /></div>
    <!-- <input id="image_input" type="file" accept="image/*" /> -->
    <input id="image_input" type="file" :accept="`${acceptType.type}/*`" />
    <p>{{acceptType.name}}</p>
  </label>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  props:['acceptType'],
  setup(props) {
    const imageSrc = ref('');
    onMounted(() => {
      const inputImages = document.getElementById("image_input");
      const store = useStore();
      

      if(props.acceptType.type==='image'){
        imageSrc.value = require('../../../img/pic.png');
      }else{
        imageSrc.value = require('../../../img/video.png');
      }

      inputImages.addEventListener("change", () => {
        store.dispatch("addphoto/tellImageInput", {newInput:true,inputFile:inputImages});
      });
    });

    return {
      imageSrc
    }
  },
};
</script>

<style scoped>
.add_photos {
  background: #350b79;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add_photos > div {
  display: inline-block;
  width: 1.8rem;
  height: 1.8rem;
  background-color: white;
  border-radius: 0.3rem;
  margin-right: 0.2rem;
}

.add_photos > div > img {
  width: 100%;
  height: 100%;
}

.add_photos > p {
  display: inline-block;
  color: white;
  padding-top: 0.9rem;
}
input[type="file"] {
  display: none;
}
</style>