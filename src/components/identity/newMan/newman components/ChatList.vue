<template>
  <div class="main_contents">
    <div class="no_data" v-if="chatList.join('') === ''">目前尚無聊天紀錄</div>
    <div class="chat_list" v-else>
      <h3>聊天列表</h3>
      <div
        v-for="(chat, index) in chatList"
        :key="chat"
        @pointerdown.prevent="enterChat(chat)"
        class="chat_person"
      >
        🙂 {{ chat }}
        <div v-if="judgeUnread[index]!==0">{{ judgeUnread[index] }}</div>
        <!-- {{isReadArray[index]}} -->
        <!-- v-if="isReadArray[index]!==0" -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import chatListUpdate from "../../../../hooks/firebase/chat/chatListUpdate.js";
import getNewEmail from "../../../../hooks/getNewEmail.js";
import { useRouter } from "vue-router";
// import { watch } from "@vue/runtime-core";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const yourWeddingEmail = getNewEmail(
      store.getters["auth/allAuthInform"]["allAuthInform"].email
    );
    const isReadArray = computed(() => store.getters["chat/getIsRead"]);
    const getSender = computed(() => store.getters["chat/getSender"]);
    const chatList = computed(() => store.getters["chat/getHostWeddingList"]);

    // console.log(isReadArray.value,getSender.value);
    const judgeUnread = computed(()=>{
        let countUnread = [];
      for(let i=0;i<getSender.value.length;i++){
        let count = 0;
        for(let j=0;j<getSender.value[i].length;j++){
          if(getSender.value[i][j]==='guest'&&isReadArray.value[i][j]===false){
            count++;
          }
        }
        countUnread.push(count);
      }
      return countUnread;
    });
    

    //更新chatlist
    chatListUpdate({ yourWeddingEmail, store });

    function enterChat(email) {
      store.dispatch("chat/updateSelectedEmail", email);
      localStorage["selectedWeddingEmail"] = email;
      router.replace("/newMan/chat");
    }

    // function judgeUnread(index){
    //   let countUnread = 0;

    //   for(let i=0;i<isReadArray.value[index];i++){

    //     if(getSender.value[index][i]==='guest' && isReadArray.value[index][i]===false){
    //       countUnread++;
    //     }
    //   }
    //   return countUnread;
    // }

    return {
      chatList,
      enterChat,
      isReadArray,
      judgeUnread
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
}

.no_data {
  min-height: 50vh;
  text-align: center;
  line-height: 50vh;
  /* vertical-align: -webkit-baseline-middle; */
  font-size: 2rem;
}

.chat_list {
  min-height: 10vh;
}

.chat_list > h3 {
  text-align: center;
  /* background-color: aqua; */
  border-radius: 0.5rem;
  /* margin: .5rem 5rem; */
  /* width: fit-content; */
}

.chat_person {
  text-align: left;
  font-size: 1.5rem;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  box-shadow: 0 0 5px 6px rgba(211, 213, 238, 0.836);
  border-radius: 1rem;
  margin: 2rem 0.5rem;
  padding: 0.5rem;
  position: relative;
}

.chat_person:hover,
.chat_person:active {
  background-color: blue;
  color: white;
}

.chat_person > div {
  text-align: center;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.8rem;
  border-radius: 50%;
  background: red;
  font-size: 0.8rem;
  color: white;
}

/* .chat_person::after{
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  border: 2px solid black;
  content: '';
} */
</style>