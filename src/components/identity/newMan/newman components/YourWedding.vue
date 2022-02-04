<template>
<base-dialog :show="!thisDatabase" fixed title="Fetch data...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card inputTitle="婚禮資訊" v-if="thisDatabase">
  <div class="newManName">
    <span>新郎: {{ thisDatabase.bridegroomName }} </span>
    <span>新娘: {{ thisDatabase.brideName }}</span>
  </div>
  <h3>日期: {{ thisDatabase.date }}</h3>
  <h3>時間: {{ thisDatabase.startTime }} ~ {{ thisDatabase.endTime }}</h3>
  <h3>地點: {{ thisDatabase.place }}</h3>
  <h3>登入碼 {{ thisDatabase.loginPassword }}</h3>
  <img :src="thisDatabase.marriedImg||require('../../../../img/identity/noImage.jpg')" />
    </base-card>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { nextTick, watch } from "@vue/runtime-core";
import getNewEmail from "../../../../hooks/getNewEmail.js";

export default {
  setup() {
    const store = useStore();

    const AllFirebasDatbase = computed(
      () => store.getters["firebaseDatabase/getFirebaseData"]
    );
    let thisDatabase = ref(null);

    //若有填入資料，會更新AllDatabase
    try {
      watch(AllFirebasDatbase, () => {
        //getEmail
        getThisDataBase();
        localStorage['yourWeddingDatabase'] = JSON.stringify(thisDatabase.value);
        // store.dispatch('updateYourWeddingDatabase',thisDatabase.value);
      });
    } catch (err) {
      console.log(err);
    }

    //若沒有填入資料，直接進入database
    nextTick(() => {
      getThisDataBase();
      localStorage['yourWeddingDatabase'] = JSON.stringify(thisDatabase.value);
      store.dispatch('firebaseDatabase/updateYourWeddingDatabase',thisDatabase.value);
    });

    function getThisDataBase() {
      const thisDatabaseEmail = computed(() =>
        getNewEmail(store.getters["auth/allAuthInform"]["allAuthInform"].email)
      );
      for (const database in AllFirebasDatbase.value) {
        if (database.split("_")[1] === thisDatabaseEmail.value) {
          thisDatabase.value = AllFirebasDatbase.value[database];
          break;
        }
      }
    }

    return {
      thisDatabase,
    };
  },
};
</script>

<style scoped>
.inner_contents {
  margin: 1.5rem;
}

img {
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  max-width: 500px;
}

.newManName {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.newManName > span {
  display: inline-block;
  background: rgb(74 12 74);
  color: white;
  border-radius: 0.5rem;
  font-weight: 900;
  padding: 0.5rem;
}
</style>