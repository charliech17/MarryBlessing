<template>
  <div
    class="color_bar"
    v-if="colorIn && isEditingText"
    ref="colorUpdater"
    tabindex="-1"
  >
   <!-- @blur.prevent="blurColorInput($event)" -->
    <!-- @touchend="blurColorInput" -->
    <!-- @focus="colorBarInput" -->
    <div
      class="color_picker"
      v-for="color in allTextColors[colorPage]"
      :key="color"
      :style="appendColor(color)"
      @pointerdown.prevent="changeTextColor(color)"
    ></div>
    <div
      class="less_color"
      @pointerdown.prevent="changePageColor(-1)"
      v-if="colorPage >= 1"
    >
      <div></div>
    </div>
    <div
      class="more_color"
      @pointerdown.prevent="changePageColor(1)"
      v-if="colorPage <= 1"
    >
      <div></div>
    </div>
  </div>
  <!-- <input
    type="color"
    v-model="colorInput.color"
    @blur="blurColorInput"
    @input="changeColor"
    v-if="colorInput.showInput"
    ref="colorUpdater"
  /> -->
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import textColor from "./textColor.js";
// import { useStore } from "vuex";
// import { nextTick, watch } from "@vue/runtime-core";
// import getNewBlessingText from "../../../../hooks/getNewBlessingText.js";

export default {
  props: ["colorIn", "textArea", "nowEdit", "isEditingText"],
  emits: ["colorInputFalse"],
  setup(props) {
    // const store = useStore();

    const allTextColors = reactive(textColor);
    const colorPage = ref(0);

    function appendColor(color) {
      return {
        backgroundColor: color,
      };
    }

    function changePageColor(change) {
      colorPage.value += change;
    }

    const colorUpdater = ref("");


    // function blurColorInput() {
    //   console.log(1111);
    //   if (props.textArea().id !== "root") {
    //     const changeParameters = {
    //       color: props.textArea().style.color,
    //     };
    //     const newBlessingText = getNewBlessingText(
    //       props.textArea().id,
    //       changeParameters
    //     );

    //     store.dispatch("blessing/editBlessingText", newBlessingText);
    //   }

    //   target.emit("colorInputFalse");

    //   props.nowEdit(true, store.getters["blessing/isEditText"].editId);

    //   props.textArea().focus();
    // }

    // function colorBarInput(){
    //   window.addEventListener("pointerdown",(event)=>{
    //     // console.log(event.target.tagName);
    //       console.log(event.target.tagName);
    //     if(event.target.tagName !== "DIV" || event.target.tagName !== "TEXTAREA"){
    //       blurColorInput();
    //     }
    //   });
    // }

    function changeTextColor(color) {
      // props.textArea().focus();
      props.textArea().style.color = color;
    }

    return {
      // blurColorInput,
      // colorInput,
      // showColorInput,
      // changeColor,
      // colorBarInput,
      colorUpdater,
      changeTextColor,
      allTextColors,
      appendColor,
      colorPage,
      changePageColor,
    };
  },
};
</script>

<style scoped>
/* input[type="color"] {
  display: block;
  margin: 1vh auto;
  width: 5vw;
  height: 3vh;
} */
.color_bar {
  display: flex;
  justify-content: center;
  padding: 2vw;
  padding-top: 3vw;
  gap: 3vw;
}

.color_picker {
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  border: 2px solid black;
}

.more_color,
.less_color {
  width: 6vw;
  height: 6vw;
}

.more_color > div,
.less_color > div {
  width: 100%;
  height: 100%;
  background-image: url("../../../../img/nextPage.png");
  background-size: cover;
  background-position: center;
}

.less_color > div {
  background-image: url("../../../../img/beforePage.png");
}
</style>