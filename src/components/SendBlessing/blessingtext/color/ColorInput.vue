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
      v-for="(color,index) in allTextColors[colorPage]"
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
import { computed,reactive, ref } from "@vue/reactivity";
import textColor from "./textColor.js";
import { useStore } from 'vuex';
import checkNeedDispatch from '../../../../hooks/checkNeedDispatch.js';
import setTextBackgroundColor from './setTextBackgroundColor.js';

export default {
  props: ["colorIn", "textArea", "nowEdit", "isEditingText"],
  emits: ["colorInputFalse"],
  setup(props) {
    const store = useStore();

    const allTextColors = reactive(textColor);
    const controlColors = computed(()=>store.getters['editText/controlColors']); //,colorIndex,colorMode
    // const {colorPage,colorMode} = reactive(controlColors.value);
    // console.log(controlColors.value['colorPage']);
    const colorPage = ref(0);
    

    function appendColor(color) {
      return {
        backgroundColor: color,
      };
    }

    function changePageColor(change) {
      colorPage.value += change;
      // console.log(props.textArea());
      // store.dispatch('editText/changeColorPage',change);
      checkNeedDispatch({store,textArea:props.textArea,dispatchName:'changeColorPage',changeParameter:change});
    }

    const colorUpdater = ref("");


    function judgeShowPage(nextPage){
        if(nextPage){
          return (colorPage.value ===1||colorPage.value ===0);
          // return (controlColors.value['colorPage'] ===1||controlColors.value['colorPage'] ===0);
        }

        return (colorPage.value ===1||colorPage.value ===2);
          // return (controlColors.value['colorPage'] === 1|| controlColors.value['colorPage'] === 2);
    }

    function changeTextColor(color,index) {
      props.textArea().style.color = color;
      // props.textArea().style.backgroundColor = textBackgroundColor()[controlColors.value['colorPage']][index];

      //update colorIndex
      // const changeParameters={
      //   changeName: 'colorIndex',
      //   changeValue:index
      // }
      // store.dispatch('editText/changeControlColors',changeParameters);
      // store.dispatch('editText/changeColorIndex',index);
      checkNeedDispatch({store,textArea:props.textArea,dispatchName:'changeColorIndex',changeParameter:index});
      setTextBackgroundColor({store,getTextArea:props.textArea});
    }


// function checkNeedDispatch(dispatchName,changeParameter){
//        if(props.textArea().id==='root'){
//          store.dispatch(`editText/${dispatchName}`,changeParameter);
//        }
//      }

    return {
      judgeShowPage,
      colorUpdater,
      changeTextColor,
      allTextColors,
      appendColor,
      colorPage,
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