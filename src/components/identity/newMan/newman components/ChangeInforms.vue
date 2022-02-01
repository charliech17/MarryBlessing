<template>
  <base-dialog :show="checkInfo.isLoading" fixed title="updating...">
    <base-spinner></base-spinner>
  </base-dialog>
  <base-card inputTitle="更改婚禮資訊">
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
        <input type="time" id="startTime" v-model="newMarriedData.startTime" />
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
      <p v-if="checkInfo.isInValid" class="warning">請再次檢查有無漏填</p>
      <label for="image" class="image">
        <p>新增一張結婚照吧</p>
        <input type="file" id="image" @change="updateImage($event)" />
        <img id="weddingImg" />
      </label>
      <div class="buttons">
        <button>確認資訊 ▶</button>
      </div>
    </form>
  </base-card>
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import uploadToFirebase from "../../../../hooks/firebase/upload.js";
import deleteStorageItems from "../../../../hooks/firebase/deleteStorage.js";
import fetchDatePut from "../../../../hooks/firebase/fetchData.js";
import { useRouter } from "vue-router";
import { nextTick } from "@vue/runtime-core";
export default {
  setup() {
    let file = null;

    const store = useStore();
    const router = useRouter();
    const yourWeddingData = computed(
      () => store.getters["firebaseDatabase/getYourWeddingDatabase"]
    );
    const oldValues = { password: null, imgSrc: null };

    nextTick(() => {
      // console.log(yourWeddingData.value);
      let finalSelectedWedding = yourWeddingData.value;
      if (typeof yourWeddingData.value === "string") {
        finalSelectedWedding = JSON.parse(yourWeddingData.value);
      }

      if (!finalSelectedWedding) {
        finalSelectedWedding = JSON.parse(localStorage["yourWeddingDatabase"]);
      }

      //initial inputs values
      const idNames = [
        "bridegroom",
        "bride",
        "date",
        "startTime",
        "endTime",
        "place",
        "password",
      ];
      const weddingNames = [
        "bridegroomName",
        "brideName",
        "date",
        "startTime",
        "endTime",
        "place",
        "loginPassword",
      ];
      for (let i = 0; i < idNames.length; i++) {
        const element = document.getElementById(idNames[i]);
        element.value = finalSelectedWedding[weddingNames[i]];
        element.dispatchEvent(new Event("input"));
      }

      document.getElementById("weddingImg").src =
        finalSelectedWedding.marriedImg;

      oldValues.password = finalSelectedWedding.loginPassword;
      oldValues.imgSrc = finalSelectedWedding.marriedImg;
    });

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

      //有更新圖片
      if (oldValues.imgSrc !== document.getElementById("weddingImg").src) {
        //newMarriedData["marriedImg"]
        //delete old image
        // console.log('delete image!!!!!!!');
        await deleteStorageItems(oldValues.imgSrc);
        // upload new Image
        await uploadToFirebase({
          file,
          store,
          newMarriedData,
          checkInfo,
          router,
          reload:true
        });
      }
      //無更新圖片
      else {
        newMarriedData["marriedImg"] = oldValues.imgSrc;
        // console.log(newMarriedData["loginPassword"]);
        await fetchDatePut({
          isHost: true,
          savePlace: `${newMarriedData["loginPassword"]}`,
          saveData: newMarriedData,
          store,
        });

        checkInfo.isLoading = false;
        router.replace("/newMan/yourwedding");
      }

      //檢查有無更新，若有則刪除原本資料
      if (oldValues.password !== newMarriedData["loginPassword"]) {
        //刪除
        await fetchDatePut({
          remove: true,
          store,
          savePlace: oldValues.password,
          isHost: true,
        });
      }

      // checkInfo.isLoading = false;
      // router.replace('/newMan/yourwedding');
      // location.reload();
      return;
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
      submitForm,
      newMarriedData,
      checkInfo,
      updateImage,
    };
  },
};
</script>

<style scoped>
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
  text-align: end;
}

.buttons > button {
  background-color: transparent;
  border: none;
  text-align: end;
}

.buttons > button:active,
.buttons > button:hover {
  background-color: rgb(248, 208, 253);
}

.warning {
  font-size: 1rem;
}
</style>