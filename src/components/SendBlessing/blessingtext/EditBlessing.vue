<template>
<transition name="edit">
      <div class="edit_text_contorl" v-if="isEditingText">
        <base-button @pointerdown="sizeChange" disabled>大小</base-button>
        <base-button @pointerdown.prevent="textColor">顏色</base-button>
        <base-button @pointerdown.prevent="changeTextBackground">背景</base-button>
        <base-button disabled>動畫</base-button>
        <base-button disabled>字形</base-button>
      </div>
</transition>
      <color-input
        :colorIn="showColorInput"
        :textArea="getTextArea"
        :nowEdit="nowEditText"
        :isEditingText="isEditingText"
        @colorInputFalse="colorInputFalse"
      ></color-input>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import ColorInput from "./color/ColorInput.vue";
import { nextTick, watch } from "@vue/runtime-core";
import editMoveText from "../../../hooks/editMoveText.js";
import setTextBackgroundColor from './color/setTextBackgroundColor.js';
import checkNeedDispatch from '../../../hooks/checkNeedDispatch.js'

export default {
  components: {
    ColorInput,
  },
  setup() {
    const store = useStore();

    const isEditingText = computed(
      () => store.getters["blessing/isEditText"].isEditing
    );
    watch(isEditingText, () => {
      nextTick(() => {
        if (isEditingText.value && getTextArea().id !== "root") {
          const textArea = getTextArea();
          editMoveText(textArea);
        }
      });
    });

    function sizeChange() {
      //do somthing
    }

    const showColorInput = ref(false);

    function textColor() {
      // showColorInput.value = true;
      showColorInput.value = !showColorInput.value;
    }

    function colorInputFalse() {
      showColorInput.value = false;
    }

    function changeTextBackground() {
      // //colorMode=-1 colorMode++
      // if(getTextArea().id === 'root'){
      //   store.dispatch('editText/changeColorMode');
      // }
      // store.dispatch
      checkNeedDispatch({store,textArea:getTextArea,dispatchName:'changeColorMode',changeParameter:null});
      setTextBackgroundColor({store,getTextArea});
    }

    function nowEditText(boolen, id) {
      const editTexting = {
        isEditing: boolen,
        editId: id,
      };
      store.dispatch("blessing/isEditingText", editTexting);
    }

    function getTextArea() {
      const elementId = store.getters["blessing/isEditText"].editId;
      const textArea = document.getElementById(elementId);
      return textArea;
    }

    return {
      isEditingText,
      sizeChange,
      textColor,
      showColorInput,
      getTextArea,
      nowEditText,
      colorInputFalse,
      changeTextBackground,
    };
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
}

.edit_text_contorl {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2vh 5vw;
  margin-bottom: 0;
  gap: 5vw;
  background-color: rgb(59, 8, 153);
  border-radius: 1rem;
  transition: all 5s;
}

.edit_text_contorl button {
  /* font-size: 1.2rem; */
  font-size: 1.2rem;
  /* padding: 0.5rem; */
  padding: 1vw;
  /* width: 6vw; */
  padding: 0;
  margin: 0 1vw;
  border-radius: 0.5rem;
  background-color: white;
  color: #350b79;
  font-weight: 700;
}

.edit_text_contorl button:hover,
.edit_text_contorl button:active {
  background-color: #f0c5e2;
}

.edit-enter-from {
  opacity: 0;
  transform: translateY(30px);
  /* transition: all .1s; */
}

.edit-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.edit-enter-active {
  transition: all 0.5s ease-out;
}

.edit-leave-active {
  transition: all 0.5s ease-in;
}

.edit-enter-to,
.edit-leave-from {
  opacity: 1;
  transform: translateY(0px);
  /* transition: all 0.1s; */
}

</style>