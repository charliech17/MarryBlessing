<template>
  <base-dialog :show="isLoading" fixed title="fetching...">
    <base-spinner></base-spinner>
  </base-dialog>
  <div class="main_contents">
    <div class="show_chats">
      <div v-for="(message, index) in chatStore[0]" :key="index">
        <span>{{ chatStore[1][index] }}</span>
        <p>{{ message }}</p>
      </div>
    </div>

    <div class="inputs">
      <textarea v-model="inputContents" />
      <button @pointerdown.prevent="inputChats" v-if="inputContents !== ''">
        輸入
      </button>
      <button v-else>🎙️</button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { nextTick, watch } from "@vue/runtime-core";
import { useStore } from "vuex";

import uploadChat from "../../../../hooks/firebase/chat/uploadChat.js";
import getNewEmail from "../../../../hooks/getNewEmail.js";
import onUpdateChats from "../../../../hooks/firebase/chat/updateChats.js";

export default {
  setup() {
    //判斷現在是host 還是guest

    //載入一些資料
    const store = useStore();

    const chatStore = computed(
      () => store.getters["chat/getGuestNowWeddingMessage"]
    );

    const sendWeddingEmail = store.getters["chat/getSelectedEmail"];
    const guestEmail = getNewEmail(
      store.getters["auth/allAuthInform"]["allAuthInform"].email
    );

    const inputContents = ref("");

    const domElement = {};

    //若載入完成移動到底端
    watch(chatStore, () => {
      //移動到最下面
      try {
        scrollToBottom();
      } catch (error) {
        nextTick(() => {
          scrollToBottom();
        });
      }
    });

    onUpdateChats({ guestEmail, hostEmail: sendWeddingEmail, store });

    nextTick(() => {
      domElement.showChats = document.querySelector(".show_chats");
      domElement.textArea = document.querySelector(".inputs>textarea");
    });

    function inputChats() {

      //把chat upload到firebase
      const uploadMessage = [[inputContents.value], [getNowTime()], ["host"]];

      uploadChat({ sendWeddingEmail, uploadMessage, guestEmail });

      //清除input
      cleanTextArea();
    }

    function scrollToBottom() {
      nextTick(() => {
        domElement.showChats.scrollTop = domElement.showChats.scrollHeight;
      });
    }

    function cleanTextArea() {
      domElement.textArea.value = "";
      domElement.textArea.dispatchEvent(new Event("input"));
    }

    function getNowTime() {
      const nowTime = new Date().toString().split(" ")[4].split(":");
      return `${nowTime[0]}:${nowTime[1]}`;
    }

    return {
      // chats,
      inputChats,
      inputContents,
      chatStore,
    };
  },
};
</script>

<style scoped>
.main_contents {
  /* margin-top: 2rem;
  width: 100vw; */

  background-color: rgb(255, 255, 255);
  margin: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
}

/* .inner{
    
} */

.show_chats {
  height: 50vh;
  margin: 0.5rem 0;
  padding: 1rem;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  background-color: #96c0e6;
  overflow-y: scroll;
  box-sizing: border-box;
}

.show_chats > div {
  /* display: inline-block; */
  float: right;
  clear: right;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5rem;
}

.show_chats > div > span {
  margin-bottom: 0.5rem;
  font-size: 0.2rem;
}

.show_chats > div > p {
  background-color: greenyellow;
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: fit-content;
  max-width: 70%;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  margin: 0.2rem 0;
  font-size: 1rem;
}

.inputs {
  display: flex;
  justify-content: center;
  margin: 0.5rem;
  /* align-items: center; */
  /* flex-grow: 1; */
}

.inputs > textarea {
  border: 1px solid black;
  flex: 1 1 auto;
  font-size: 1rem;
}
</style>