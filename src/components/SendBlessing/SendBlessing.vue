<template>
<base-dialog :show="notLogin"  title="請先登入" @close="handleError">
    請先登入帳號，以啟用祝福牆功能
  </base-dialog>
  <div class="controls_and_contents">
    <transition name="edit">
      <div id="buttonEditSection" class="buttons" v-if="!isEditingText">
        <base-button
          buttonStyle="purple"
          :needImage="true"
          @click="videoPlay"
          v-if="inputType === 'video'"
          id="btn_play_video"
          >播放影片 <template #img> <img src="../../img/video.png" /> </template
        ></base-button>
        <base-button buttonStyle="purple" @click="addText" :needImage="true"
          >新增文字 <template #img> <img src="../../img/text.png" /> </template
        ></base-button>
        <base-button
          buttonStyle="purple"
          :needImage="true"
          @click="handleUpload"
          >上傳<template #img> <img src="../../img/upload.png" /> </template
        ></base-button>
      </div>
    </transition>

    <edit-blessing class="edit_blessing"></edit-blessing>

    <add-blessing class="add_blessing"> </add-blessing>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import AddBlessing from "./blessingtext/AddBlessing.vue";
import EditBlessing from "./blessingtext/EditBlessing.vue";
import uploadBlessing from "../../hooks/firebase/blessing/uploadBlessing.js";
import getNewEmail from '../../hooks/getNewEmail.js'
export default {
  components: {
    AddBlessing,
    EditBlessing,
  },
  setup() {
    const store = useStore();
    const isEditingText = computed(
      () => store.getters["blessing/isEditText"].isEditing
    );
    const inputType = computed(
      () => store.getters["addphoto/getStateItem"].inputType
    );

    function addText() {
      store.dispatch("blessing/isAddingText", true);
      nowEditText(true, "root");
    }

    function nowEditText(boolen, id) {
      const editTexting = {
        isEditing: boolen,
        editId: id,
      };
      store.dispatch("blessing/isEditingText", editTexting);
    }

    //video play 按鈕
    const nowVideoPlay = ref(false);
    function videoPlay() {
      nowVideoPlay.value = !nowVideoPlay.value;
      if (nowVideoPlay.value) {
        document.getElementsByClassName("show_bg_image")[0].play();
        return;
      }
      document.getElementsByClassName("show_bg_image")[0].pause();
    }


    //處理上傳資料
     const allAuthInform = computed(
      () => store.getters["auth/allAuthInform"]["allAuthInform"]
    );
    
    const notLogin = ref(false);
    function handleUpload() {
      //若未登入，return 
      if(!allAuthInform.value.isNewman||!allAuthInform.value.isGuest){
        notLogin.value = true;
        return;
      }
        // hostEmail 和 guestEmail

      const sendWeddingEmail = store.getters["chat/getSelectedEmail"];
      const guestEmail = getNewEmail(
        store.getters["auth/allAuthInform"]["allAuthInform"].email
      );

      uploadBlessing({ store, sendWeddingEmail, guestEmail });
      // console.log(upload);
    }

    function handleError(){
      notLogin.value = false;
    }

    return {
      addText,
      isEditingText,
      videoPlay,
      inputType,
      handleUpload,
      notLogin,
      handleError
    };
  },
};
</script>

<style scoped>
.controls_and_contents {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* max-height: 90vh; */
  width: 100%;
}

.buttons {
  width: 100%;
  display: flex;
  justify-content: center;
  flex: 0 1 auto;
  max-width: 1200px;
}

.edit_blessing {
  flex: 0 1 auto;
}

.add_blessing {
  flex: 1 1 auto;
}

.buttons > * {
  width: 33.3%;
  font-size: 1.5vw;
  margin: 1rem 1rem;
}

.buttons > button img {
  width: 100%;
  height: 100%;
}

/* .editTextControls-enter-form,
.editTextControls-leave-to{

} */

.edit-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.edit-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.edit-enter-active {
  transition: all 0.3s ease-out;
}

.edit-leave-active {
  transition: all 0.3s ease-in;
}

.edit-enter-to,
.edit-leave-from {
  opacity: 1;
  transform: translateY(0);
}

@media (min-width: 1200px) {
  .controls_and_contents {
    height: auto;
    background-color: rgb(34, 41, 65);
    max-height: none;
  }
  .buttons > * {
    border: 0.3rem white solid;
  }
}
</style>
