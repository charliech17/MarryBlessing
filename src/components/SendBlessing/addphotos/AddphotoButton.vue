<template>
  <label class="add_photos">
    <div><img src="../../../img/pic.png" /></div>
    <input id="image_input" type="file" accept="image/*" />
    <p>新增照片</p>
  </label>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  setup() {
    onMounted(() => {
      const inputImages = document.getElementById("image_input");
      const store = useStore();

      inputImages.addEventListener("change", () => {
        store.dispatch("addphoto/tellImageInput", {newInput:true,inputFile:inputImages});
      });
    });
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