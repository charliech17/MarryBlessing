<template>
  <div class="main_contents">
    <canvas id="canvas" ref="canvas" :class="{opacity:isEditText.isEditing}"> </canvas>
    <textarea
      class="input_text"
      id="root"
      v-if="showTextArea"
      v-model="enterText"
      ref="textInput"
      @blur="blurInput"
      @input="changeSize"
      @focus="setZIndex"
    />

    <!-- https://source.unsplash.com/gYl-UtwNg_I/1500x1500 -->

    <blessing-text :canvas="canvas"></blessing-text>

    <delete-text
      :class="{ hidden: !isTextMoving, tryDelete: wantDelete }"
    ></delete-text>
    <!-- :class="{hidden: !isTextMoving,tryDelete:wantDelete}" -->
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from "vue";
import { useStore } from "vuex";
import BlessingText from "./ShowBlessingtext.vue";
import changeTextareaWidth from "../../../hooks/changeTextareaWidth.js";
import DeleteText from "./delete/DeleteText.vue";
import "animate.css";
export default {
  components: {
    BlessingText,
    DeleteText,
  },
  setup() {
    const store = useStore();

    //監聽(SendBlessing.vue)是否按下 '新增文字',按下時
    const textInput = ref("");
    const canvas = ref("");
    const showTextArea = ref(false);
    const textAreaWidth = ref(20);
    const clickAddText = computed(() => store.getters["blessing/isAddedText"]); //ref(store.getters['blessing/isAddedText']);
    const isTextMoving = computed(
      () => store.getters["blessing/getIsTextMoving"]
    );
    const wantDelete = computed(() => store.getters["blessing/getWantDelete"]);
    const inputImage = computed(() => store.getters["addphoto/getInputStatus"]);
    const isEditText = computed(()=>store.getters["blessing/isEditText"]);
    let uploaded_image = "";

    onMounted(() => {
      watch(inputImage, () => {
        
        if(!inputImage.value.newInput) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
         uploaded_image = reader.result;
         canvas.value.style.backgroundImage = `url(${uploaded_image})`;
        });
        reader.readAsDataURL(inputImage.value.inputFile.files[0]);
        store.dispatch("addphoto/tellImageInput", {newInput:false,inputFile:null});
      });
    });

    async function focusTextInput() {
      await (showTextArea.value = true);
      textInput.value.focus();
      textInput.value.style.resize = "none";
    }

    watch(clickAddText, (value) => {
      if (value === true) {
        focusTextInput();
      }
    });

    const enterText = ref("");

    function blurInput(event) {
      let boolenIsEdting = false;

      try {
        if (event.relatedTarget.tagName === "BUTTON") {
          boolenIsEdting = true;
          nowEditText(boolenIsEdting, "root");
          return;
        }
      } catch (err) {
        //err
      }
      nowEditText(false, "root");

      event.target.style.height = "1px";
      const finalHeight = `${event.target.scrollHeight}px`;

      showTextArea.value = false;

      const saveBlessingText = {
        id: new Date().toISOString(),
        text: enterText.value,
        style: {
          left: 5 + `%`,
          top: null,
          bottom: 50 + `%`,
          width: `${textAreaWidth.value}px`,
          height: finalHeight,
          color: window.getComputedStyle(textInput.value).color,
        },
      };

      const notSavingBlessing = ["", null, undefined];
      if (!notSavingBlessing.includes(enterText.value.trim())) {
        store.dispatch("blessing/addBlessingText", saveBlessingText);
      }
      store.dispatch("blessing/isAddingText", false);

      textInput.value.style.zIndex = "auto";

      enterText.value = "";

      // console.log(window.getComputedStyle(textInput.value).color);
      const initialInput = {
        lastId: saveBlessingText.id,
        color: window.getComputedStyle(textInput.value).color,
      };
      store.dispatch("blessing/setInitialValues", initialInput);
    }

    function changeSize() {
      textAreaWidth.value = changeTextareaWidth(textInput);
      textInput.value.style.width = `${changeTextareaWidth(textInput)}px`;
    }

    function setZIndex() {
      textInput.value.style.zIndex = 2147483647;
    }

    function nowEditText(boolen, id) {
      const editTexting = {
        isEditing: boolen,
        editId: id,
      };
      store.dispatch("blessing/isEditingText", editTexting);
    }

    return {
      textInput,
      showTextArea,
      enterText,
      blurInput,
      setZIndex,
      changeSize,
      canvas,
      isTextMoving,
      wantDelete,
      isEditText
    };
  },
};
</script>


<style scoped>
.main_contents {
  display: flex;
  justify-content: center;
  position: relative;
}

#canvas {
  width: 95%;
  height: 75vh;
  display: block;
  background-color: rgb(241, 204, 204);
  border-radius: 2rem;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.input_text {
  position: absolute;
  bottom: 50%;
  left: 5%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  text-align: center;
  max-width: 80vw;
  /* width: auto; */
  width: 2px;
  height: auto;
  max-height: 30vh;
  overflow: hidden;
  resize: none;
  font-family: Arial, Helvetica, sans-serif;
}

::-webkit-resizer {
  border: 5px solid rgba(241, 204, 204, 0.1);
  border-bottom-color: rgba(0, 0, 0, 0.5);
  border-right-color: rgba(0, 0, 0, 0.5);
  outline: 1px solid rgba(241, 204, 204, 0.2);
  /* box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1); */
}

.input_text:active,
.input_text:focus {
  /* outline: black 1px solid; */
  resize: both;
  box-shadow: 0 0 5px 8px rgba(0, 0, 0, 0.2);
}

.result_text {
  position: absolute;
  bottom: 50%;
  font-size: 2rem;
}

.hidden {
  visibility: hidden;
}

.tryDelete {
  animation: bounce 0.5s infinite;
  /* transform: scale(100,100);
   */
  width: 2rem;
  height: 2rem;
  background-color: white;
  border: none;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.2);
}

.opacity{
  opacity: 0.2;
}
</style>