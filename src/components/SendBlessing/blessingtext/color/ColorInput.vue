<template>
  <div
    class="color_bar"
    tabindex="-1"
    v-if="colorIn && isEditingText"
    >
  <!-- v-if="colorIn && isEditingText" -->
   <!-- @blur.prevent="blurColorInput($event)" -->
    <!-- @touchend="blurColorInput" -->
    <!-- @focus="colorBarInput" -->
    <div
      class="color_picker"
      v-for="(color,index) in allTextColors[controlColors['colorPage']]"
      :key="color"
      :style="appendColor(color)"
      @pointerdown.prevent="changeTextColor(color,index)"

    ></div>
    <div
      class="less_color"
      @pointerdown.prevent="changePageColor(-1)"
      v-if="judgeShowPage(false)"
    >
      <div></div>
    </div>
    <div
      class="more_color"
      @pointerdown.prevent="changePageColor(1)"
      v-if="judgeShowPage(true)"
    >
      <div></div>
    </div>
  </div>
</template>

<script>
import { computed,reactive} from "@vue/reactivity";
import textColor from "./textColor.js";
import { useStore } from 'vuex';
import checkNeedDispatch from '../../../../hooks/checkNeedDispatch.js';
import setTextBackgroundColor from './setTextBackgroundColor.js';
// import { watch } from '@vue/runtime-core';

export default {
  props: ["colorIn", "textArea", "nowEdit", "isEditingText"],
  emits: ["colorInputFalse"],
  setup(props) {
    const store = useStore();

    const allTextColors = reactive(textColor);
    const controlColors = computed(()=>store.getters['editText/controlColors']); //,colorIndex,colorMode
    // const colorPage = ref(0);
    

    function appendColor(color) {
      return {
        backgroundColor: color,
      };
    }

    function changePageColor(change) {
      // colorPage.value += change;
      checkNeedDispatch({store,textArea:props.textArea,dispatchName:'changeColorPage',changeParameter:change});
      // checkNeedDispatch({store,textArea:props.textArea,dispatchName:'changePage',changeParameter:change});
    }

    function judgeShowPage(nextPage){
        if(nextPage){
          return (controlColors.value.colorPage ===1||controlColors.value.colorPage ===0);
        }

        return (controlColors.value.colorPage ===1||controlColors.value.colorPage ===2);
    }

    function changeTextColor(color,index) {
      props.textArea().style.color = color;
      checkNeedDispatch({store,textArea:props.textArea,dispatchName:'changeColorIndex',changeParameter:index});
      setTextBackgroundColor({store,getTextArea:props.textArea});

      //Ui selected Color
      // document.querySelector(`.color_bar color_picker:nth-child(${index})`).style.border = '.2rem solid black';
    }


    // const isEditingText = computed(()=>props.isEditingText)
    // watch(isEditingText,(isEditing)=>{
    //   if(!isEditing){
    //     colorPage.value = 0;
    //   }
    // })
     

    return {
      judgeShowPage,
      changeTextColor,
      allTextColors,
      appendColor,
      // colorPage,
      controlColors,
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
  align-items: center;
  padding: 2vw;
  padding-top: 3vw;
  gap: 3vw;
}

.color_picker {
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  border: 2px solid black;
  /* box-sizing: border-box; */
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