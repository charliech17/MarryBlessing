<template>
  <!-- <base-dialog :show="isLoading" fixed title="fetching...">
    <base-spinner></base-spinner>
  </base-dialog> -->
  <div class="main_contents">
    <div class="show_chats">
      <div
        class="each_chat"
        v-for="(message, index) in chatStore[0]"
        :key="index"
      >
        <div :id="judgeMessage(chatStore[2][index])">
          <div>
            <span
              v-if="
                !judgeMessage(chatStore[2][index]) &&
                chatStore[3][index] === true
              "
              >已讀</span
            >
            <br />
            <span>{{ chatStore[1][index] }}</span>
          </div>
          <p>{{ message }}</p>
        </div>
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
import uploadIsRead from "../../../../hooks/firebase/chat/uploadRead.js";
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

    // hostEmail 和 guestEmail
    const sendWeddingEmail = store.getters["chat/getSelectedEmail"];
    const guestEmail = getNewEmail(
      store.getters["auth/allAuthInform"]["allAuthInform"].email
    );

    //輸入的內容
    const inputContents = ref("");

    //取得dom element
    const domElement = {};
    nextTick(() => {
      domElement.showChats = document.querySelector(".show_chats");
      domElement.textArea = document.querySelector(".inputs>textarea");
    });

    //判斷是否是isGuest
    const isGuest = computed(
      () => store.getters["auth/allAuthInform"]["allAuthInform"].isGuest
    );

    const identity = ref("host");
    if (isGuest.value) {
      identity.value = "guest";
    }

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

    //隨時更新聊天內容
    onUpdateChats({
      guestEmail,
      hostEmail: sendWeddingEmail,
      store,
      identity: identity.value,
    });

    //監聽是否更新訊息或是"點入聊天室"，若有則將已讀設定為true
    let totalUnread = calUnread(chatStore.value[3]);
    if (totalUnread > 0) {
      uploadIsRead({
        guestEmail,
        hostEmail: sendWeddingEmail,
        identity: identity.value,
        totalUnread,
      });
    }

    watch(chatStore, () => {
      //計算其中false的總數
      if (chatStore.value.join("")) {
        let totalUnread = calUnread(chatStore.value[3]);

        //更新到firebase上
        uploadIsRead({
          guestEmail,
          hostEmail: sendWeddingEmail,
          identity: identity.value,
          totalUnread,
        });
      }
    });

    function inputChats() {
      //把chat upload到firebase
      const uploadMessage = [
        [inputContents.value],
        [getNowTime()],
        [identity.value],
        [false],
      ];

      uploadChat({
        hostEmail: sendWeddingEmail,
        uploadMessage,
        guestEmail,
        identity: identity.value,
      });

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

    function judgeMessage(side) {
      if (side !== identity.value) {
        return "otherMessage";
      }
    }

    // function judgeRead(isRead){
    //   for(const read of isRead){
    //     if(read === true){

    //     }
    //   }

    // }

    function calUnread(isReadArray) {
      // if(isReadArray)
      let totalUnread = 0;
      for (const isRead of isReadArray) {
        if (isRead === false) {
          totalUnread++;
        }
      }
      return totalUnread;
    }

    return {
      judgeMessage,
      inputChats,
      inputContents,
      chatStore,
      identity,
    };
  },
};
</script>

<style scoped>
.main_contents {
  background-color: rgb(255, 255, 255);
  margin: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  max-width: 500px;
}

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

.each_chat {
  width: 100%;
  display: block;
}

.each_chat > div {
  /* display: inline-block; */
  /* float: right;
  clear: right; */
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 0.5rem;
}

#otherMessage {
  flex-direction: row-reverse;
}

#otherMessage > p {
  background-color: antiquewhite;
}

.each_chat > div > div > span {
  margin-bottom: 0.5rem;
  font-size: 0.2rem;
}

.each_chat > div > p {
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

@media (min-width: 550px) {
  .main_contents {
    margin: 2rem auto;
  }
}
</style>