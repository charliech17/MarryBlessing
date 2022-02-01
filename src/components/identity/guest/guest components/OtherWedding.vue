<template>
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
        <img
          :src="
            thisDatabase.marriedImg ||
            require('../../../../img/identity/notFound2.png')
          "
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const thisDatabase = computed(
      () => store.getters["firebaseDatabase/getSelectedDatabase"]
    );

    if (typeof thisDatabase.value === "string") {
      store.dispatch(
        "firebaseDatabase/updateSelectedDatabase",
        JSON.parse(thisDatabase.value)
      );
    }

    return {
        thisDatabase
    }
  },
};
</script>

<style scoped>
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