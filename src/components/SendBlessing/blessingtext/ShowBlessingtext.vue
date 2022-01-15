<template>
  <textarea
    v-for="(blessing, index) in allBlessingTextAreas"
    :id="blessing.id"
    :class="{ opacity: isEditText.isEditing }"
    :key="index"
    :value="blessing.text"
    :style="styleList(blessing.style)"
    draggable="false"
    @mousedown="mouseClick"
    @mousemove="mouseMove($event)"
    @touchstart.prevent="mouseClick"
    @touchmove.prevent="mouseMove($event)"
    @touchend.prevent="touchEdit($event, blessing.id)"
    @blur="blurTextArea($event, blessing.id, blessing.style)"
    @dblclick.prevent="clickEdit($event, blessing.id)"
    @input.prevent="changeSize($event, blessing.id)"
  />
    <!-- readonly -->
  <!-- :readonly="judgeParameter.onlyRead" -->
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { computed, nextTick, watch } from "@vue/runtime-core";
import editMoveText from "../../../hooks/editMoveText.js";
import initialValues from "./initial/initial.js";
import { useStore } from "vuex";

import changeTextareaWidth from "../../../hooks/changeTextareaWidth.js";

export default {
  props: ["canvas"],
  setup(props) {
    const store = useStore();
    const allBlessingTextAreas = store.getters["blessing/getBlessingText"];
    const isEditText = computed(() => store.getters["blessing/isEditText"]);
    const blessingTextAdded = computed(
      () => store.getters["blessing/getBlessingText"].length
    );

    watch(blessingTextAdded, (newValue, oldValue) => {
      if (newValue < oldValue) return;
      nextTick(() => {
        const getInitial = store.getters["blessing/getInitialInputs"];
        const newAddTextId = getInitial.lastId;
        const changeParameters = {
          color: getInitial.color,
        };
        updateBlessingText(newAddTextId, changeParameters);
      });
    });

    function styleList(blessingStyle) {
      return initialValues({ isCahngeSize, blessingStyle });
    }

    const judgeParameter = reactive({
      mousePressed: false,
      notFocus: true,
      onlyRead: true,
      nowDoubleClick: false,
      wantEdit: false,
      isMouseMove: false,
      deleteTextarea: [false, null],
    });

    const trash_canIcon = ref(null);

    nextTick(() => {
      trash_canIcon.value = document.getElementById("trash_can");
    });

    function mouseClick(event) {
      event.target.style.resize = "both";
      Object.assign(judgeParameter, {
        mousePressed: true,
        notFocus: false,
        wantEdit: true,
      });
    }

    function mouseMove(event) {
      if (judgeParameter.notFocus || judgeParameter.nowDoubleClick) {
        return;
      }

      const cursorX = event.pageX || event.touches[0]["pageX"];
      const cursorY = event.pageY || event.touches[0]["pageY"];
      const textInputValue = event.target;
      const canvas = props.canvas;

      textInputValue.style.cursor = "pointer";

      if (!judgeParameter.mousePressed) {
        return;
      }

      judgeParameter.wantEdit = false;
      judgeParameter.isMouseMove = true;
      const textareaWidth = textInputValue.offsetWidth;
      const textareaHeight = textInputValue.offsetHeight;
      const cavasRect = canvas.getBoundingClientRect();

      const { htmlWidth, htmlHeight } = getHtmlWidthAndHeight();

      textInputValue.style.left = `${
        (cursorX - textareaWidth / 2) / htmlWidth
      }vw`;
      textInputValue.style.top = `${
        (cursorY - textareaHeight / 2 - cavasRect.top) / htmlHeight
      }vh`;

      if (
        (cursorX - textareaWidth / 2) / htmlWidth <
        cavasRect.left / htmlWidth
      ) {
        textInputValue.style.left = `${cavasRect.left / htmlWidth}vw`;
      }

      if (
        (cursorX - textareaWidth / 2) / htmlWidth >
        (cavasRect.right - textareaWidth) / htmlWidth
      ) {
        textInputValue.style.left = `${
          (cavasRect.right - textareaWidth) / htmlWidth
        }vw`;
      }

      if (
        (cursorY - textareaHeight / 2) / htmlHeight <
        cavasRect.top / htmlHeight
      ) {
        textInputValue.style.top = `${0}vh`;
      }

      if (cursorY > cavasRect.bottom - textareaHeight / 2) {
        textInputValue.style.top = null;
        textInputValue.style.bottom = `${0}vh`;
      }

      const getTrash_can = trash_canIcon.value;
      const trash_canBound = getTrash_can.getBoundingClientRect();
      judgeParameter.deleteTextarea = [false, null];
      if (
        cursorX < trash_canBound.left + getTrash_can.offsetWidth &&
        cursorX > trash_canBound.left &&
        cursorY < trash_canBound.top + getTrash_can.offsetHeight &&
        cursorY > trash_canBound.top
      ) {
        judgeParameter.deleteTextarea = [true, textInputValue.id];
      }
    }

    watch(judgeParameter, () => {
      if (judgeParameter.isMouseMove) {
        store.dispatch("blessing/isTextMoving", true);
      }
      if (judgeParameter.deleteTextarea[0]) {
        store.dispatch("blessing/tryToDelete", true);
      } else {
        store.dispatch("blessing/tryToDelete", false);
      }
    });

    function mouseup() {
      judgeParameter.mousePressed = false;
      judgeParameter.notFocus = true;
      judgeDelete();
      // judgeMouseMove();
    }

    window.addEventListener("mouseup", mouseup);

    async function blurTextArea(event, id, blessingStyle) {
      const textArea = event.target;

      textArea.style.resize = "none";
      textArea.style.cursor = "pointer";

      const isDoubleClick = judgeParameter.nowDoubleClick;

      judgeParameter.nowDoubleClick = false;

      let boolenIsEdting = false;
      try {
        if (event.relatedTarget.tagName === "BUTTON") {
          boolenIsEdting = true;
        }
      } catch (err) {
        //err
      }

      nowEditText(boolenIsEdting, id);

      editMoveText(
        textArea,
        blessingStyle.top,
        blessingStyle.left,
        blessingStyle.bottom
      );

      if (isDoubleClick) {
        const changeParameters = {
          text: textArea.value,
          width: `${textArea.offsetWidth}px`,
          height: textArea.style.height,
          color: window.getComputedStyle(textArea).color,
        };

        //沒有改變長寬寬度了
        isCahngeSize.value = false;
        updateBlessingText(id, changeParameters);
      }
    }

    function clickEdit(event, id) {
      event.target.style.cursor = "auto";
      judgeParameter.onlyRead = false;
      judgeParameter.nowDoubleClick = true;

      nowEditText(true, id);
    }

    function touchEdit(event, id) {
      judgeDelete();

      try {
        const stylePosition = {
          bottom: event.target.style.bottom,
          top: event.target.style.top,
          left: event.target.style.left,
        };
        judgeMouseMove(id, stylePosition);
      } catch (err) {
        nowEditText(false, id);
      }

      if (!judgeParameter.wantEdit || judgeParameter.isMouseMove) {
        judgeParameter.isMouseMove = false;
        event.target.style.resize = "none";
        store.dispatch("blessing/isTextMoving", false);
        return;
      }
      nextTick(() => {
        Object.assign(event.target.style, { cursor: "auto", opacity: "1" });
        Object.assign(judgeParameter, {
          nowDoubleClick: true,
          wantEdit: false,
        });

        event.target.focus();
        nowEditText(true, id);
      });
    }

    function nowEditText(boolen, id) {
      const editTexting = {
        isEditing: boolen,
        editId: id,
      };
      store.dispatch("blessing/isEditingText", editTexting);
    }

    function getHtmlWidthAndHeight() {
      const htmlWidth =
        (window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth) / 100;

      const htmlHeight =
        (window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight) / 100;

      return { htmlWidth, htmlHeight };
    }

    function judgeDelete() {
      if (judgeParameter.deleteTextarea[0] === true) {
        store.dispatch(
          "blessing/deleteBlessing",
          judgeParameter.deleteTextarea[1]
        );
        judgeParameter.deleteTextarea = [false, null];
      }
    }

    function updateBlessingText(id, changeParameters) {
      const newBlessingText = {
        id,
        changeParameters,
      };
      store.dispatch("blessing/editBlessingText", newBlessingText);
    }

    function judgeMouseMove(id, stylePosition) {
      if (judgeParameter.isMouseMove) {
        const changeParameters = {
          bottom: stylePosition.bottom,
          top: stylePosition.top,
          left: stylePosition.left,
        };
        updateBlessingText(id, changeParameters);
        // judgeParameter.isMouseMove = false;
      }
    }

    const isCahngeSize = ref(false);
    function changeSize(event, id) {
      const textInput = event.target;
      const textAreaWidth = `${changeTextareaWidth(textInput)}px`;
      isCahngeSize.value = true;

      Object.assign(textInput.style, {
        width: `${textAreaWidth}`,
        height: "1px", //because need scrollHeight
      });

      const finalHeight = `${textInput.scrollHeight}px`;

      const changeParameters = {
        text: textInput.value,
        width: textAreaWidth,
        height: finalHeight,
        color: textInput.style.color,
        // window.getComputedStyle(textInput).height
      };
      updateBlessingText(id, changeParameters);
    }

    // function goTop(){
    //   window.scrollTo(0,0);
    //   document.body.scrollTop =0;
    // }

    return {
      allBlessingTextAreas,
      judgeParameter,
      styleList,
      mouseClick,
      mouseMove,
      mouseup,
      blurTextArea,
      clickEdit,
      touchEdit,
      isEditText,
      changeSize,
    };
  },
};
</script>

<style scoped>
textarea {
  overflow: hidden;
  max-width: 80vw;
  height: 10vh;
  background-color: transparent;
  border: none;
  resize: none;
  text-align: center;
  cursor: pointer;
  padding: 0;
  z-index: 1;
}

.opacity {
  opacity: 0.2;
}
</style>