<template>
  <base-dialog title="Error" :show="!fileSizeValid" @close="handleError"
    >上傳的檔案大於20MB，<br />請先解壓縮或上傳較小的檔案</base-dialog
  >
  <label class="add_photos">
    <div><img :src="imageSrc" /></div>
    <input
      :id="`image_input_` + acceptType.type"
      type="file"
      :accept="`${acceptType.type}/*`"
    />
    <p>{{ acceptType.name }}</p>
  </label>
</template>

<script>
import { onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  props: ["acceptType"],
  setup(props) {
    const imageSrc = ref("");
    const fileSizeValid = ref(true);

    //網頁Mounted後執行
    onMounted(() => {
      const inputFile = document.getElementById(
        "image_input_" + props.acceptType.type
      );
      const store = useStore();
      const router = useRouter();

      if (props.acceptType.type === "image") {
        imageSrc.value = require("../../../img/pic.png");
        handleInputs({ inputFile, store, router });
      } else if (props.acceptType.type === "video") {
        imageSrc.value = require("../../../img/video.png");
        handleInputs({ inputFile, store, router });
      }

      // handleInputs({ inputFile, store, router });

      //處理檔案輸入
      function handleInputs({ inputFile, store, router }) {
        // console.log(inputFile);
        inputFile.addEventListener("change", () => {
          //若檔案大於20MB跳出false
          if (inputFile.files[0].size > 20971520) {
            //20,971,520 20971520
            fileSizeValid.value = false;
            return;
          }

          //將檔案存入store中 a. input status, fileType
          store.dispatch("addphoto/tellImageInput", {
            newInput: true,
            inputFile: inputFile,
          });

          store.dispatch("addphoto/updateStateItem", {
            name: "inputType",
            value: props.acceptType.type,
          });

          router.replace("/blessing");
        });
      }
    });

    //處理錯誤
    function handleError() {
      fileSizeValid.value = true;
    }

    return {
      imageSrc,
      fileSizeValid,
      handleError,
    };
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
  padding: 0.5rem;
  cursor: pointer;
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
  font-weight: 800;
}
input[type="file"] {
  display: none;
}
</style>