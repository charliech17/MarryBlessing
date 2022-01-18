<template>
  <div class="first_page">
    <div class="index_photo">
      <img id="index_photo" :src="dynamicIndexPhoto" alt="" />
    </div>
    <div class="introduce">
      <h1>婚禮祝福</h1>
      <div class="outer_blessing_icon">
        <div class="blessing_icon">
          <img src="../../img/index/blessing.png" alt="" />
        </div>
      </div>
      <p class="intro_text">
        想在婚禮中聽到朋友們的祝福嗎? 有什麼話想對新郎新娘說的嗎?
        立即註冊或登入，開始製作你專屬的婚禮祝福牆吧!!
      </p>
      <router-link to="/login">註冊/登入</router-link>
    </div>
  </div>
  <div class="second_page">
    <div class="feature">
      <h2>簡單操作</h2>
      <div class="feature_photo">
        <img src="../../img/index/easy.jpg" />
      </div>
      <p>類似ig的限時動態，可以新增圖片，文字及背景</p>
    </div>
    <div class="feature">
      <h2>快速方便</h2>
      <div class="feature_photo">
        <img src="../../img/index/immediately.jpg" alt="" />
      </div>
      <p>隨拍隨傳，把想說的話都對新人說吧!!!</p>
    </div>
    <div class="feature">
      <h2>即時回饋</h2>
      <div class="feature_photo">
        <img src="../../img/index/enjoy.jpg" alt="" />
      </div>
      <p>新人只要登入頁面即可看到別人的祝福喔~~</p>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  setup() {
    const dynamicIndexPhoto = ref(require("../../img/index/homePhoto1.jpg"));
    const indexPhotos = [0, [1, 2, 3, 4]];
    // const indexPhotoEven = ref(false);

    
    setInterval(() => {
      indexPhotos[0]++;
      if (indexPhotos[0] > 3) {
        indexPhotos[0] = 0;
      }

      // indexPhotoEven.value = !indexPhotoEven.value;
      dynamicIndexPhoto.value = require(`../../img/index/homePhoto${
        indexPhotos[1][indexPhotos[0]]
      }.jpg`);
    }, 3000);

    return {
      dynamicIndexPhoto,
    };
  },
};
</script>

<style scoped>
.first_page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* height: 100%; */
}

.index_photo {
  width: 100%;
  box-sizing: border-box;
  background-color: #66c7cd;
  transition: 0.8s;
  /* new */
  position: relative;
  width: 100%;
  /* height: 30vh; */
  /* overflow: hidden; */
  /* height:; */
  /* animation: turnImg infinite ease-in-out; */
}
.index_photo > img {
  width: 100%;
  height: 100%;
  max-width: 1500px;
  /* position: ab   */
}
/* .img-slider{
  overflow: hidden;
  position: relative;
  height: 200px;
  width: 400px;
} */

img {
  width: 100%;
  height: 100%;
  /* position: absolute;
  left: 0;
  /* top: 0; */
}

.introduce {
  background-color: #66c7cd;
  position: relative;
  /* flex-basis: ; */
  flex: 1 1 auto;
}

.introduce > h1 {
  text-align: center;
  margin-top: 0;
}

.outer_blessing_icon {
  position: relative;
  height: 4rem;
}

.blessing_icon {
  height: 4rem;
  width: 4rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  /* display: flex;
    /* justify-content: center;
    align-items: center; */
}

.blessing_icon > img {
  width: 100%;
  height: 100%;
}

.intro_text {
  margin: 2.5rem 1rem;
  font-size: 1.5rem;
}

.introduce > a {
  display: block;
  text-align: center;
  font-size: 2rem;
  padding: 0.5rem;
  text-decoration: none;
  box-shadow: 0 0 15px 6px rgba(0, 0, 0, 0.2);
  background: white;
  border-radius: 1.5rem;
  margin: 3rem;
  font-weight: 900;
  color: #ce82ce;
}

.feature {
  text-align: center;
  background-color: #ebdede;
  padding: 20vh auto;
  border-bottom: 1px solid;
  padding: 2rem;
}

.feature > * {
  margin: 0;
}

.feature_photo {
  width: 100%;
  box-sizing: border-box;
  margin: 2vh 0;
  float: left;
}

@media (min-width:1500px) {
  .index_photo{
    display: flex;
    justify-content: center;
    background-color: black;   
  }
}
</style>