<template>
  <div class="color_bar" tabindex="-1" v-if="colorIn && isEditingText">
    <div
      class="color_picker"
      v-for="(color, index) in allTextColors[controlColors['nowColorBarPage']]"
      :key="color"
      :style="appendColor(color)"
      @pointerdown.prevent="changeTextColor(color, index)"
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
import { computed, reactive } from "@vue/reactivity";
import textColor from "./textColor.js";
import { useStore } from "vuex";
import changeControlColors from "../../../../hooks/changeControlColors.js";
import setTextBackgroundColor from "./setTextBackgroundColor.js";
import { nextTick, watch } from "@vue/runtime-core";
// import { onBeforeMount, watch } from '@vue/runtime-core';
// import { nextTick, watch } from "@vue/runtime-core";

export default {
  props: ["colorIn", "textArea", "nowEdit", "isEditingText"],
  emits: ["colorInputFalse"],
  setup(props) {
    const store = useStore();

    const allTextColors = reactive(textColor);
    const controlColors = computed(
      () => store.getters["editText/controlColors"]
    );

    const isEditing = computed(() => props.isEditingText);
    const colorIn = computed(() => props.colorIn);

    //initial
    const lastSelected = { colorPage: 0, colorIndex: 1 };
    watch(isEditing, () => {
      if (isEditing.value && colorIn.value) {
        nextTick(() => {
          focusSelectedColor(true);
        });
      }
    });

    watch(colorIn, () => {
      if (colorIn.value) {
        nextTick(() => {
          focusSelectedColor(true);
        });
      }
    });

    function appendColor(color) {
      return {
        backgroundColor: color,
      };
    }

    function changePageColor(change) {
      changeControlColors({
        store,
        textArea: props.textArea,
        // dispatchName: "changeColorPage",
        dispatchName: "changeColorBarPage",
        changeParameter: change,
      });
      focusSelectedColor(true);
      // console.log(controlColors.value);
      // const colorPage = controlColors.value.colorPage;
    }

    function judgeShowPage(nextPage) {
      if (nextPage) {
        return (
          controlColors.value.nowColorBarPage === 1 ||
          controlColors.value.nowColorBarPage === 0
        );
      }

      return (
        controlColors.value.nowColorBarPage === 1 ||
        controlColors.value.nowColorBarPage === 2
      );
    }

    function changeTextColor(color, index) {
      props.textArea().style.color = color;

      const changes = [
        ["updateColorPage", controlColors.value.nowColorBarPage],
        ["changeColorIndex", index],
      ];
      for (const change of changes) {
        changeControlColors({
          store,
          textArea: props.textArea,
          // dispatchName: "changeColorIndex",
          dispatchName: change[0],
          changeParameter: change[1],
        });
      }
      console.log(controlColors.value);
      setTextBackgroundColor({ store, getTextArea: props.textArea });

      //增加現在顏色的選取
      focusSelectedColor();
      // console.log(controlColors.value);
    }

    function focusSelectedColor(initial = false) {
      // console.log(controlColors.value);
      if (
        controlColors.value.nowColorBarPage !== controlColors.value.colorPage
      ) {
        // console.log(1111);
        return;
      }

      const colorIndex = controlColors.value.colorIndex;
      // console.log(colorIndex,initial);
      nextTick(()=>{
        document.body
        .querySelector(`.color_bar`)
        .children.item(colorIndex)
        .classList.add("pickedColor");

        console.log(colorIndex,lastSelected.colorIndex,initial);
      
      if ( (colorIndex!==lastSelected.colorIndex)) {
        if(!initial){
          document.body
            .querySelector(`.color_bar`)
            .children.item(lastSelected.colorIndex)
            .classList.remove("pickedColor");
        }
      }
        updateLastSelected();
      });
      
    }

    function updateLastSelected() {
      lastSelected["colorPage"] = controlColors.value.colorPage;
      lastSelected["colorIndex"] = controlColors.value.colorIndex;
    }

    // watch(controlColors, (newValue, oldValue) => {
    //   if (newValue !== oldValue) {
    //     console.log(newValue);
    //   }
    // });

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

.pickedColor {
  border: 5px solid white;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
}

@media (min-width: 1200px) {
  .color_picker {
    border: 5px solid white;
    /* box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2); */
    /* box-sizing: border-box; */
  }
  .pickedColor {
  border: 2rem solid white;
  box-shadow: 0 0 20px 20px rgba(0, 0, 0, 0.2);
}
}
</style>