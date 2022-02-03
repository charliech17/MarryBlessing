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
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const chatList = computed(() => store.getters["chat/getHostWeddingList"])
    const judgeUnread = computed(()=>store.getters['chat/getItemAll'].allUnreadInform);

    function enterChat(email) {
      store.dispatch("chat/updateSelectedEmail", email);
      localStorage["selectedWeddingEmail"] = email;
      router.replace("/newMan/chat");
    }


    return {
      chatList,
      enterChat,
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
  max-width: 750px;
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
  border-radius: 0.5rem;
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

@media (min-width: 750px) {
  .main_contents{
    margin: 2rem auto;
  }
}
</style>