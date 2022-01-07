<template>
  <div class="edit_text_contorl" v-if="isEditingText">
    <base-button @click="sizeChange">大小</base-button>
    <base-button @click="textColor">顏色</base-button>
    <base-button>背景</base-button>
    <base-button>動畫</base-button>
    <base-button>字形</base-button>
  </div>
<!-- v-if="isEditingText" -->
  <color-input
    :colorIn="colorInput"
    :textArea="getTextArea"
    :nowEdit="nowEditText"
    @colorInputFalse="colorInputFalse"
  ></color-input>
  
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import ColorInput from "./color/ColorInput.vue";

export default {
  components: {
    ColorInput,
  },
  setup() {
    const store = useStore();


    const isEditingText = computed(
      () => store.getters["blessing/isEditText"].isEditing
    );

    function sizeChange() {
      //do somthing
    }

    const colorInput = reactive({
      color: "",
      showInput: false,
    });

    
    function textColor() {
      colorInput.showInput = true;
      nowEditText(false, store.getters["blessing/isEditText"].editId);
    }

    function colorInputFalse(){
      colorInput.showInput = false;
    }

    function nowEditText(boolen, id) {
      const editTexting = {
        isEditing: boolen,
        editId: id,
      };
      store.dispatch("blessing/isEditingText", editTexting);
    }

    function getTextArea(){
      const elementId = store.getters["blessing/isEditText"].editId;
      const textArea = document.getElementById(elementId);
      return textArea;
    }


    return {
      isEditingText,
      sizeChange,
      textColor,
      colorInput,
      getTextArea,
      nowEditText,
      colorInputFalse,
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
  gap: 5vw;
  background-color: rgb(59, 8, 153);
  border-radius: 1rem;
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

</style>