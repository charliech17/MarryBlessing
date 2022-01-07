<template>
  <input
    type="color"
    v-model="colorInput.color"
    @blur="blurColorInput"
    @input="changeColor"
    v-if="colorInput.showInput"
    ref="colorUpdater"
  />
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { nextTick, watch } from "@vue/runtime-core";
import getNewBlessingText from "../../../../hooks/getNewBlessingText.js";

export default {
  props: ["colorIn", "textArea", "nowEdit"],
  emits: ["colorInputFalse"],
  setup(props, target) {
    const store = useStore();

    const colorInput = reactive(props.colorIn);
    const colorUpdater = ref("");

    function blurColorInput() {
      if (props.textArea().id !== "root") {
        const changeParameters = {
          color: colorUpdater.value.value,
        };
        const newBlessingText = getNewBlessingText(
          props.textArea().id,
          changeParameters
        );

        store.dispatch("blessing/editBlessingText", newBlessingText);
      }

      target.emit("colorInputFalse");

      props.nowEdit(true, store.getters["blessing/isEditText"].editId);

      props.textArea().focus();
    }

    function changeColor() {
      props.textArea().style.color = colorUpdater.value.value;
    }

    watch(colorInput, (value) => {
      if (value.showInput !== true) return;
      nextTick(() => {
        colorUpdater.value.focus();
        colorUpdater.value.click();
      });
    });

    return {
      blurColorInput,
      colorInput,
      changeColor,
      colorUpdater,
    };
  },
};
</script>

<style scoped>
input[type="color"] {
  display: block;
  margin: 1vh auto;
  width: 5vw;
  height: 3vh;
}
</style>