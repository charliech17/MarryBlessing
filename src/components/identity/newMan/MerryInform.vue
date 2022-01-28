<template>
  <base-dialog :show="checkInfo.isLoading" fixed title="Authenticating...">
    <base-spinner></base-spinner>
  </base-dialog>
  <div class="outer_background">
    <base-card inputTitle="輸入婚禮資訊">
      <form @submit.prevent="submitForm">
        <div class="name_labels">
          <label for="bridegroom">新郎姓名</label>
          <label for="bride">新娘姓名</label>
        </div>
        <div class="name_inputs">
          <input
            type="text"
            id="bridegroom"
            v-model="newMarriedData.bridegroomName"
          />
          <input type="text" id="bride" v-model="newMarriedData.brideName" />
        </div>
        <div class="date_time">
          <label for="date">日期</label>
          <input type="date" id="date" v-model="newMarriedData.date" />
        </div>
        <div class="date_time">
          <label for="startTime">開始時間</label>
          <input
            type="time"
            id="startTime"
            v-model="newMarriedData.startTime"
          />
        </div>
        <div class="date_time">
          <label for="endTime">結束時間</label>
          <input type="time" id="endTime" v-model="newMarriedData.endTime" />
        </div>
        <div class="place">
          <label for="place">地點</label>
          <input type="text" id="place" v-model="newMarriedData.place" />
        </div>
        <div class="place">
          <label for="password">結婚登入碼</label>
          <input
            id="password"
            type="password"
            pattern="[0-9]*"
            inputmode="numeric"
            placeholder="盡量簡單，方便親友輸入"
            v-model="newMarriedData.loginPassword"
          />
        </div>
        <label for="image" class="image">
          <p>新增一張結婚照吧</p>
          <input type="file" id="image" @change="updateImage($event)" />
          <img />
        </label>
        <p v-if="checkInfo.isInValid" class="warning">請再次檢查有無漏填</p>
        <div class="buttons">
          <button @click="reset" type="button">◀ 重新選擇</button>
          <button>確認資訊 ▶</button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
// import fireBaseInit from "../../../hooks/firebaseInitailize/firebaeInit.js";
import uploadToFirebase from "../../../hooks/firebase/upload.js";
import fetchDatePut from "../../../hooks/firebase/fetchData.js";
// import onUpdateDate from '../../../hooks/firebaseInitailize/onUpdateData.js'
import { useStore } from "vuex";
// import "firebase/storage";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    let file = null;
    function reset() {
      //將localStorage 移除
      localStorage.removeItem('isGuest');
      store.dispatch('auth/updateState',{name:'isGuest',value:false});

      router.replace("/identity");
    }

    const checkInfo = reactive({
      isInValid: false,
      isLoading: false,
    });
    const newMarriedData = reactive({
      bridegroomName: null,
      brideName: null,
      date: null,
      startTime: null,
      endTime: null,
      place: null,
      loginPassword: null,
    });

    async function submitForm() {
      //檢查有無漏掉資訊，get所有資料
      checkInfo.isInValid = false;
      checkInfo.isLoading = true;

      for (const data in newMarriedData) {
        if (newMarriedData[data] === null) {
          Object.assign(checkInfo, { isInValid: true, isLoading: false });
          return;
        }
      }
      //fetch firebase存入資料newMarriedDate(文字及照片)
      newMarriedData["isInitial"] = true;
      // 登入碼-new Date().toISOString();

      if (!file) {
        newMarriedData["marriedImg"] = null;

        fetchDatePut({
          isHost: true,
          savePlace: `${newMarriedData["loginPassword"]}`,
          saveData: newMarriedData,
          store,
        });
        checkInfo.isLoading = false;

        //切換navbar內容
        store.dispatch('auth/updateState',{name:'isNewman',value:true});
        store.dispatch('auth/updateState',{name:'isGuest',value:false});

        router.replace('/identity/newMan');
        return;
      }

      await uploadToFirebase({ file, store, newMarriedData, checkInfo,router });
      //進入最終頁面(可修改資料、查看祝福牆、新增照片集、認識的經過...)
    }

    function updateImage(event) {
      file = event.target.files[0];
      if (!file) {
        return;
      }
      let fileURL = URL.createObjectURL(file);
      event.target.parentElement.children[2].src = fileURL;
    }

    return {
      reset,
      submitForm,
      newMarriedData,
      checkInfo,
      updateImage,
    };
  },
};
</script>

<style scoped>
.outer_background {
  min-height: 100%;
  /* background-color: black; */
  background-image: url("../../../img/identity/inform.jpg");
  background-size: cover;
  background-position: center;
}

.name_labels {
  text-align: center;
  margin-top: 0.5rem;
}

.name_labels > label {
  display: inline-block;
  width: 35%;
  margin: 0 5%;
  font-size: 1rem;
  /* text-align: center; */
}

.name_inputs {
  padding: 0.5rem;
  text-align: center;
}

.name_inputs > input {
  width: 35%;
  margin: 0 5%;
  border: 1px solid black;
}

.date_time {
  margin: 1rem 10%;
  text-align: center;
}

.date_time > label {
  margin-right: 1rem;
}

.date_time > input {
  border: 1px solid black;
}

.place {
  margin: 1rem 10%;
  text-align: center;
}

.place > label {
  display: block;
  margin-bottom: 0.2rem;
}

.place > input {
  width: 80%;
  border: 1px solid black;
  padding: 0.3rem;
}

.image {
  display: block;
  margin: 1.5rem auto;
  position: relative;
  width: 8rem;
  height: 8rem;
  border: 1px solid black;
  background-color: rgb(249, 248, 252);
  /* text-align: center; */
}

.image > p {
  position: absolute;
  margin: 0;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.image > input {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
}

.image > img {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.buttons > button {
  background-color: transparent;
  border: none;
}

.buttons > button:active,
.buttons > button:hover {
  background-color: rgb(248, 208, 253);
}

.warning {
  font-size: 1rem;
}
/* .date>input{
    
} */
</style>