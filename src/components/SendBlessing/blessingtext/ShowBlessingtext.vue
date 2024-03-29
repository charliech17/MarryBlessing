  <template>
  <textarea
    v-for="(blessing, index) in allBlessingTextAreas"
    :id="blessing.id"
    :class="{ opacity: isEditText.isEditing }"
    :key="index"
    :value="blessing.text"
    :style="styleList(blessing.style)"
    draggable="false"
    @pointerdown.prevent="mouseClick"
    @pointermove="mouseMove($event)"
    @pointerup.prevent="touchEdit({ blessing })"
    @blur="blurTextArea($event, blessing.id, blessing.style)"
    @input.prevent="changeSize($event, blessing.id)"
  />
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { computed, nextTick, watch } from "@vue/runtime-core";
import editMoveText from "../../../hooks/editMoveText.js";
import initialValues from "./initial/initial.js";
import { useStore } from "vuex";
import getHtmlWidthAndHeight from "../../../hooks/getHtmlHeightandWidth.js";
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
    console.log(allBlessingTextAreas);

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
      return initialValues({ isChangeSize, blessingStyle });
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
        (cursorX - textareaWidth / 2 - cavasRect.left) / htmlWidth
      }vw`;
      textInputValue.style.top = `${
        (cursorY - textareaHeight / 2 - cavasRect.top)}px`;

      if (
        (cursorX - textareaWidth / 2) / htmlWidth <
        cavasRect.left / htmlWidth
      ) {
        textInputValue.style.left = `${0}vw`; //`${cavasRect.left / htmlWidth}vw`;
      }

      if (
        (cursorX - textareaWidth / 2) / htmlWidth >
        (cavasRect.right - textareaWidth) / htmlWidth
      ) {
        // console.log(cavasRect.width);
        textInputValue.style.left = `${
          (canvas.offsetWidth - textareaWidth) / htmlWidth
        }vw`;
      }

      if (
        (cursorY - textareaHeight / 2) / htmlHeight <
        cavasRect.top / htmlHeight
      ) {
        textInputValue.style.top = `${0}vh`;
      }

      if (cursorY > cavasRect.bottom - textareaHeight / 2) {
        textInputValue.style.top = `${
          (canvas.offsetHeight - textareaHeight) / htmlHeight
        }vh`;
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
      judgeDelete();
      Object.assign(judgeParameter, { notFocus: true });
      const lastId = store.getters["blessing/getInitialInputs"].lastId;
      if (lastId) {
        const blessing = allBlessingTextAreas.find(
          (thisBlessing) => thisBlessing.id === lastId
        );
        touchEdit({ blessing });
      }
    }

    // window.addEventListener("mouseup", mouseup);
    window.addEventListener("pointerup", mouseup);

    function blurTextArea(event, id, blessingStyle) {
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

      if (isDoubleClick) {
        const getComputedStyle = window.getComputedStyle(textArea);
        const changeParameters = {
          text: textArea.value,
          // width: `${textArea.offsetWidth}px`,
          // height: textArea.style.height,
          color: getComputedStyle.color,
          backgroundColor: getComputedStyle.backgroundColor,
          controlColors: { ...store.getters["editText/controlColors"] },
        };

        //沒有改變長寬寬度了
        isChangeSize.value = false;
        textArea.classList.remove("nowEditText");
        updateBlessingText(id, changeParameters);

        editMoveText(
          textArea,
          blessingStyle.top,
          blessingStyle.left
          // blessingStyle.bottom
        );
        //是否是空值
        if (textArea.value.trim() === "") {
          judgeParameter.deleteTextarea = [true, id];
          judgeDelete();
          return;
        }

        //reset colorControls
        store.dispatch("editText/resetAll");
      }
    }

    function clickEdit(event, id) {
      event.target.style.cursor = "auto";
      judgeParameter.onlyRead = false;
      judgeParameter.nowDoubleClick = true;

      nowEditText(true, id);
    }

    function touchEdit({ blessing }) {
      judgeDelete();

      const textArea = document.getElementById(blessing.id);

      try {
        const stylePosition = {
          // bottom: textArea.style.bottom,
          top: textArea.style.top,
          left: textArea.style.left,
        };
        judgeMouseMove(blessing.id, stylePosition);
      } catch (err) {
        nowEditText(false, blessing.id);
      }

      if (!judgeParameter.wantEdit || judgeParameter.isMouseMove) {
        judgeParameter.isMouseMove = false;
        textArea.style.resize = "none";
        store.dispatch("blessing/isTextMoving", false);
        return;
      }
      nextTick(() => {
        Object.assign(textArea.style, { cursor: "auto" });
        Object.assign(judgeParameter, {
          nowDoubleClick: true,
          wantEdit: false,
        });

        textArea.focus();
        nowEditText(true, blessing.id);
        // console.log(blessing.controlColors);
        // store.dispatch('editText/getEdited',blessing.controlColors);
        store.dispatch("editText/getEdited", blessing.controlColors);
      });
    }

    function nowEditText(boolen, id) {
      const editTexting = {
        isEditing: boolen,
        editId: id,
      };
      store.dispatch("blessing/isEditingText", editTexting);
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
        updateBlessingText(id, stylePosition);
      }
    }

    // const isCahngeSize = ref(false);
    const isChangeSize = ref(false);
    function changeSize(event, id) {
      const textInput = event.target;
      const textAreaWidth = `${changeTextareaWidth(textInput)}px`;
      isChangeSize.value = true;

      if (!textInput.value) return;
      Object.assign(textInput.style, {
        width: `${textAreaWidth}`,
        height: "1px", //because need scrollHeight
      });

      const finalHeight = `${textInput.scrollHeight}px`;
      textInput.style.height = finalHeight;

      const changeParameters = {
        text: textInput.value,
        width: textAreaWidth,
        height: finalHeight,
        color: textInput.style.color,
      };
      updateBlessingText(id, changeParameters);
    }

    return {
      allBlessingTextAreas,
      judgeParameter,
      styleList,
      mouseClick,
      mouseMove,
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
  border-radius: 0.5rem;
  font-weight: 800;
  touch-action: none;
}

.opacity {
  opacity: 0.2;
  z-index: -1;
  background-color: black;
}
</style>