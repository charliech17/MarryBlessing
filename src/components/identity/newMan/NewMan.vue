<template>
  <div class="outer_background">
    <div class="buttons">
      <base-button class="purple" @pointerdown.prevent="gotoPage(0)"
        >婚禮資訊</base-button
      >
      <base-button class="purple" @pointerdown.prevent="gotoPage(1)"
        >更改資料</base-button
      >
      <base-button class="purple guest_chat" @pointerdown.prevent="gotoPage(2)"
        >賓客聊天
        <div v-if="totalUnread!==0">{{totalUnread}}</div></base-button>
      <base-button class="purple" @pointerdown.prevent="gotoPage(3)"
        >查看祝福牆</base-button
      >
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import getNewEmail from "../../../hooks/getNewEmail.js";
import chatListUpdate from "../../../hooks/firebase/chat/chatListUpdate.js";
import { computed } from '@vue/reactivity';
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
import { watch } from '@vue/runtime-core';
export default {
  setup() {
    const routerLink = [
      "/newMan/yourwedding",
      "/newMan/changeInforms",
      "/newMan/chatlist",
    ];

    const router = useRouter();
    function gotoPage(number) {
      // console.log(routerLink[number],router);
      router.push(routerLink[number]);
    }


    //計算聊天未讀數量
    const store = useStore();
    const yourWeddingEmail = getNewEmail(
      store.getters["auth/allAuthInform"]["allAuthInform"].email
    );
    const isReadArray = computed(() => store.getters["chat/getIsRead"]);
    const getSender = computed(() => store.getters["chat/getSender"]);
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

    //計算unread總數，存入store中
    watch(judgeUnread,()=>{
      let totalUnread =0;
      for(const num of judgeUnread.value){
        totalUnread+=num;
      }
      //更新到store中
      store.dispatch('chat/updateItem',{
        name:'allUnreadInform',
        value:judgeUnread.value,
      });
      store.dispatch('chat/updateItem',{
        name:'totalUnread',
        value:totalUnread,
      });
    })

    //更新chatlist
    chatListUpdate({ yourWeddingEmail, store });

    const totalUnread = computed(()=>store.getters['chat/getItemAll'].totalUnread);

    return {
      gotoPage,
      totalUnread
    };
  },
};
</script>

<style scoped>
.outer_background {
  background-image: url("../../../img/identity/inform.jpg");
  /* height: 100%; */
  min-height: 100%;
  background-size: cover;
}

/* .inner_background{
  height: 120%;
} */

.buttons {
  text-align: center;
  padding: 1.2rem 0;
}

.buttons > button {
  font-size: 1rem;
  /* padding: .2rem .5rem; */
  /* width: 33%; */
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
}

.guest_chat {
  position: relative;
}
.guest_chat > div {
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
</style>