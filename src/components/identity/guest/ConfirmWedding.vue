<template>
  <div class="background">
    <div class="enterWeddingCode">
      <label for="weddingCode" class="weddingCode">輸入婚禮代碼</label>
      <div class="input_button">
        <input type="number" id="weddingCode" />
        <button @pointerdown.prevent="findWedding">確認</button>
      </div>
    </div>
    <li
      v-for="(wedding, index) in matchWedding"
      :key="wedding"
      @pointerdown.prevent="enterWedding(wedding, index)"
    >
      <p class="wedding_title">
        {{ wedding.bridegroomName }} & {{ wedding.brideName }} 的婚禮
      </p>
      <div class="weddingImg">
        <img :src="showImg(wedding.marriedImg)" alt="" />
      </div>
    </li>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import getAllDatabase from "../../../hooks/firebase/getAllDatabase.js";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const { AllFirebasDatbase } = getAllDatabase(store);
    const matchWedding = ref([]);
    let matchWeddingEmail = [];

    function findWedding() {
      //reset matchWedding & matchWeddingEmail
      matchWedding.value = [];
      matchWeddingEmail = [];

      for (const database in AllFirebasDatbase.value) {
        if (
          database.split("_")[0] ===
          document.getElementById("weddingCode").value
        ) {
          // console.log(AllFirebasDatbase.value[database]);
          matchWedding.value.push(AllFirebasDatbase.value[database]);
          matchWeddingEmail.push(database.split("_")[1]);
        }
      }
    }

    function enterWedding(thisWedding, index) {
      //存入目前的state 及 localStorage
      store.dispatch("firebaseDatabase/updateSelectedDatabase", thisWedding);
      store.dispatch("auth/updateState", { name: "isGuest", value: true });
      store.dispatch("chat/updateSelectedEmail", matchWeddingEmail[index]);
      // store.dispatch('auth/updateState',{name:'isNewman',value:false});

      // console.log(typeof thisWedding);
      localStorage["selectedWedding"] = JSON.stringify(thisWedding);
      localStorage["isGuest"] = true;
      // localStorage.removeItem('isNewman');
      localStorage["selectedWeddingEmail"] = matchWeddingEmail[index];

      //前往別人的婚禮
      router.replace("/guest/weddingInform");
    }

    function showImg(imgSrc) {
      if (imgSrc) {
        return imgSrc;
      }
      return require("../../../img/identity/notFound.png");
    }

    return {
      findWedding,
      matchWedding,
      enterWedding,
      showImg,
    };
  },
};
</script>

<style scoped>
.background {
  background-image: url("../../../img/identity/inform.jpg");
  background-size: cover;
  min-height: 90%;
}

li {
  list-style: none;
  background-color: white;
  width: 50%;
  margin: 1.4rem auto;
  border-radius: 0.5rem;
  padding: 0.5rem;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.5);
  max-width: 250px;
}

.enterWeddingCode {
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  margin: 3rem 1rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  max-width: 1000px;
}

.enterWeddingCode > label {
  display: block;
  text-align: center;
  margin: 1rem auto;
  width: 30%;
  padding: 0.5rem;
  font-weight: 500;
  background-color: aqua;
  border-radius: 0.5rem;
}

.input_button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.input_button > input {
  width: 40%;
  border: 1px solid black;
}

.weddingImg {
  width: 5rem;
  height: 5rem;
  margin: 0.5rem auto;
}

.weddingImg > img {
  width: 100%;
  height: 100%;
}

.wedding_title {
  text-align: center;
  background-color: rgb(225, 205, 243);
  font-weight: 900;
  border-radius: 0.8rem;
}

@media (min-width: 1000px) {
  .enterWeddingCode {
    margin: 0 auto;
  }

  .background {
    padding: 2rem;
  }
}
</style>