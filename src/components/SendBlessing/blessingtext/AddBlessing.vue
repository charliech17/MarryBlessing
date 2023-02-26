<template>
    <div class="main_contents" id="addBlessing_mainContent">
      <transition name="edit">
      <canvas
        id="canvas"
        ref="canvas"
        :class="{ opacity: isEditText.isEditing }"
        @pointerdown.prevent="mobileBlur"
      >
      </canvas>
      </transition>
      <textarea
        class="input_text"
        id="root"
        v-if="showTextArea"
        v-model="enterText"
        ref="textInput"
        @touchend="blurInput"
        @input="changeSize"
        @blur="blurInput"
        @focus="handleFocus"
      />

      <blessing-text v-if="allBlessingTextAreas.length>0" :canvas="canvas"></blessing-text>

      <delete-text
        :class="{ hidden: !isTextMoving, tryDelete: wantDelete }"
      ></delete-text>

      <background-image
        :class="{ opacity: isEditText.isEditing }"
      ></background-image>
    </div>
</template>

<script>
import { computed, nextTick, onUnmounted, ref, watch } from "vue";
import { useStore } from "vuex";
import BlessingText from "./ShowBlessingtext.vue";
import changeTextareaWidth from "../../../hooks/changeTextareaWidth.js";
import DeleteText from "./delete/DeleteText.vue";
import BackgroundImage from "./bgimage/BackgroundImage.vue";

import "animate.css";
export default {
  components: {
    BlessingText,
    DeleteText,
    BackgroundImage,
  },
  setup() {
    const store = useStore();

    //監聽(SendBlessing.vue)是否按下 '新增文字',按下時
    const textInput = ref("");
    const canvas = ref("");
    const showTextArea = ref(false);
    const textAreaWidth = ref(20);
    const allBlessingTextAreas = store.getters["blessing/getBlessingText"];

    const clickAddText = computed(() => store.getters["blessing/isAddedText"]); //ref(store.getters['blessing/isAddedText']);
    const isTextMoving = computed(
      () => store.getters["blessing/getIsTextMoving"]
    );
    const wantDelete = computed(() => store.getters["blessing/getWantDelete"]);
    const isEditText = computed(() => store.getters["blessing/isEditText"]);


    const controlColors = computed(()=>store.getters['editText/controlColors']);
    

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
        if (
          event.relatedTarget.tagName === "BUTTON" 
        ) {
          boolenIsEdting = true;
          nowEditText(boolenIsEdting, "root");
          return;
        }
      } catch (err) {
        //err
      }
      nowEditText(false, "root");

      event.target.style.height = "1px";
      const finalHeight = `${event.target.scrollHeight}`;
      

      showTextArea.value = false;

      const getComputedStyle = window.getComputedStyle(textInput.value);
      //存入BlessingText中
      
      const saveBlessingText = {
        id: new Date().toISOString(),
        text: enterText.value,
        controlColors: JSON.parse(JSON.stringify(controlColors.value)),
        style: {
          left: `5%`,
          top: `5%`,
          // bottom: 0,
          width: `${textAreaWidth.value}px`,
          height: `${finalHeight}px`,
          color: getComputedStyle.color,
          backgroundColor: getComputedStyle.backgroundColor
        },
      };


      const notSavingBlessing = ["", null, undefined];
      if (!notSavingBlessing.includes(enterText.value.trim())) {
        store.dispatch("blessing/addBlessingText", saveBlessingText);
      }

      store.dispatch('editText/resetAll');
      store.dispatch("blessing/isAddingText", false);

      

      textInput.value.style.zIndex = "auto";

      enterText.value = "";

      // nowEditText(false, "root");
      console.log(isEditText.value);

      const initialInput = {
        lastId: saveBlessingText.id,
        color: window.getComputedStyle(textInput.value).color,
      };
      store.dispatch("blessing/setInitialValues", initialInput);
    }

    function changeSize() {
      const width = changeTextareaWidth(textInput, false);
      textAreaWidth.value = width;
      
      Object.assign(textInput.value.style,{width: `${width}px`,height:'1px'});

      const finalHeight = `${textInput.value.scrollHeight}px`;
      textInput.value.style.height = finalHeight;
    }

    function handleFocus() {
      window.scroll(0,1);
      setZIndex();
    }

    window.addEventListener("pointerdown", (e) => {
      if (e.target.className.split(" ")[0] === "show_bg_image") {
        mobileBlur();
      }
    });
    function mobileBlur() {
      var field = document.createElement("div");
      field.setAttribute('tabindex',-1);
      Object.assign(field.style, {
        height: ".5px",
        width: "100%",
        border: "none",
        outline: "none",
        position: "fixed",
      });

      document.body.appendChild(field);

      setTimeout(function () {
        field.focus();
        setTimeout(function () {
          field.remove();
        }, 50);
      }, 50);
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

    nextTick(()=> {
      const navHeaderHeight         = document.getElementById('navHeader').clientHeight
      const buttonEditSectionHeight = document.getElementById('buttonEditSection').clientHeight
      const totalHeight = buttonEditSectionHeight + navHeaderHeight
      document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
      document.documentElement.style.setProperty('--upperHeight', totalHeight + 'px');
      // // console.log(document.getElementById("addBlessing_mainContent"),"????addBlessing_mainContent",navHeaderHeight,buttonEditSectionHeight)
      // setTimeout(()=> {
      //   document.getElementById("addBlessing_mainContent").style.height = `calc(var(--vh, 1vh) *100 - ${totalHeight}px);`
      //   console.log(document.getElementById("addBlessing_mainContent").style.height)
      // },100)
    })

    window.addEventListener('resize',()=> {
      document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
    })

    return {
      mobileBlur,
      handleFocus,
      textInput,
      showTextArea,
      enterText,
      blurInput,
      setZIndex,
      changeSize,
      canvas,
      isTextMoving,
      wantDelete,
      isEditText,
      allBlessingTextAreas,
    };
  },
};
</script>


<style scoped>
.main_contents {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 1200px;
  overflow: hidden;
  height: calc(var(--vh, 1vh) *100 - var(--upperHeight, 0));
}

#canvas {
  width: 100%;
  display: block;
  background-color: rgb(255, 255, 255);
  border-radius: 2rem;
  max-width: 1200px;

}

.input_text {
  position: absolute;
  top: 5%;
  left: 5%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  text-align: center;
  max-width: 80vw;
  width: 2px;
  height: auto;
  max-height: 30vh;
  overflow: hidden;
  resize: none;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 0.5rem;
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

.opacity {
  filter: brightness(0.2);
  opacity: .5;

}

.edit-enter-from {
  opacity: 0;
  transform: translateY(30px);
  /* transition: all .1s; */
}

.edit-leave-to {
  opacity: 0.5;
  transform: translateY(50px);
  background-color: black;
}

.edit-enter-active {
  transition: all .8s ease-in;
}

.edit-leave-active {
  transition: all 0.5s ease-in;
}

.edit-enter-to,
.edit-leave-from {
  opacity: 0.5;
  transform: translateY(-10px);
  background-color: black;
  /* transition: all 0.1s; */
}

@media (min-width:1200px) {
  
  #canvas {
    max-height: 842px;
    border: .3rem white solid;
  }
  .controls_and_contents{
    height: auto;
  }
}
</style>