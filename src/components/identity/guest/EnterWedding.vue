<template>
  <div class="background">
    <div class="buttons">
      <base-button class="purple">婚禮資訊</base-button>
      <base-button class="purple" @pointerdown.prevent="sendBlessing">祝福牆</base-button>
      <base-button class="purple">聊天</base-button>
    </div>
    <div class="main_contents">
      <h2>婚禮資訊</h2>
      <div class="newManName">
        <span>新郎: {{ thisDatabase.bridegroomName }} </span>
        <span>新娘: {{ thisDatabase.brideName }}</span>
      </div>
      <h3>日期: {{ thisDatabase.date }}</h3>
      <h3>時間: {{ thisDatabase.startTime }} ~ {{ thisDatabase.endTime }}</h3>
      <h3>地點: {{ thisDatabase.place }}</h3>
      <h3>登入碼 {{ thisDatabase.loginPassword }}</h3>
      <div class="outer_img">
        <div class="img_background">
          <img :src="thisDatabase.marriedImg||require('../../../img/identity/notFound2.png')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const thisDatabase = computed(
      () => store.getters["firebaseDatabase/getSelectedDatabase"]
    );

    function sendBlessing(){
      router.push('/blessing');
    }

    return {
      thisDatabase,
      sendBlessing
    };
  },
};
</script>

<style scoped>
.buttons {
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
  /* width: 100%; */
}
.buttons > button {
  width: 20%;
  font-size: 1rem;
}

.background {
  background-image: url("../../../img/identity/inform.jpg");
  background-size: cover;
  height: 100%;
  position: relative;
}

.main_contents {
  background-color: white;
  margin: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
}

h2 {
  text-align: center;
  background-color: rgb(222, 196, 247);
  width: fit-content;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: 0 auto;
  /* color: white; */
}
.newManName {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1.5rem;
}

.newManName > h2 {
  display: block;
  width: 100%;
}

.newManName > span {
  display: inline-block;
  background: rgb(74 12 74);
  color: white;
  border-radius: 0.5rem;
  font-weight: 900;
  padding: 0.5rem;
}

.outer_img {
  background-color: rgb(255, 255, 255);
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  margin: 0 2rem;
  border-radius: 0.5rem;
  background-color: black;
}

.img_background {
  height: 16rem;
  width: 9rem;
  margin: 0 auto;
  /* background-color: black; */
}

.img_background > img {
  width: 100%;
  height: 100%;
}
</style>


