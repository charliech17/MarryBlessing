<template>
  <div class="background">
    <div class="buttons">
      <base-button class="purple" @pointerdown.prevent="gotoPage(0)">婚禮資訊</base-button>
      <base-button class="purple" @pointerdown.prevent="gotoPage(1)">祝福牆</base-button>
      <base-button class="purple" @pointerdown.prevent="gotoPage(2)">聊天</base-button>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import { useRouter } from 'vue-router';
export default {
  setup() {
    const router = useRouter();

    const routerLink = ['/guest/weddingInform','/blessing','/guest/chat'];
    function gotoPage(page){
      router.push(routerLink[page]);
    }

    return {
      gotoPage,
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
  /* background-image: url("C:/Users/kccha/OneDrive/桌面/LINE_ALBUM_結婚後_220201_0.jpg"); */
  background-size: cover;
  min-height: 100%;
  position: relative;
}

/* .main_contents {
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
  /* color: white; 
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
  /* background-color: black; *
}

.img_background > img {
  width: 100%;
  height: 100%;
} */
</style>


