<template>
  <div class="first_page">
    <div class="index_photo">
      <img id="index_photo" :src="dynamicIndexPhoto" alt="" />
    </div>
    <div class="outer_introduce_background">
      <div class="introduce">
        <h1>婚禮祝福</h1>
        <div class="outer_blessing_icon">
          <div class="blessing_icon">
            <img src="../../img/index/blessing.png" alt="" />
          </div>
        </div>
        <div class="intro_text_part">
          <p class="intro_text">
            想在婚禮中聽到朋友們的祝福嗎？ 有什麼話想對新郎新娘說的嗎？
            立即註冊或登入，開始製作你專屬的婚禮祝福牆吧！！
          </p>
          <router-link to="/login">註冊/登入</router-link>
        </div>
      </div>
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
      <h2>即時回饋</h2>
      <div class="feature_photo">
        <img src="../../img/index/enjoy.jpg" alt="" />
      </div>
      <p>新人只要登入頁面即可看到別人的祝福喔~~</p>
    </div>
    <div class="feature">
      <h2>快速方便</h2>
      <div class="feature_photo">
        <img src="../../img/index/immediately.jpg" alt="" />
      </div>
      <p>隨拍隨傳，把想說的話都對新人說吧!!!</p>
    </div>
    <div class="feature">
      <h2>資料保存</h2>
      <div class="feature_photo">
        <img src="../../img/index/keep.jpg" alt="" />
      </div>
      <p>資料婚禮後保存30天</p>
    </div>
    <div class="feature">
      <h2>完全免費</h2>
      <div class="feature_photo">
        <img src="../../img/index/free.jpg" alt="" />
      </div>
      <p>無須任何費用</p>
    </div>
    <div class="feature">
      <h2>創造回憶</h2>
      <div class="feature_photo">
        <img src="../../img/index/memory.jpg" alt="" />
      </div>
      <p>留下美好的回憶</p>
    </div>
  </div>
  <div class="teach_step">
    <h2>只要四步驟</h2>
    <div class="all_steps">
      <div class="each_step">
        <h3>• step1 註冊/登入</h3>
        <p>
          &ensp;&ensp;
          若您第一次使用，需要註冊帳號，註冊完即可立即登入。無須再email或手機驗證
        </p>
        <div class="outer_teach_img">
          <div class="teach_img">
            <img src="../../img/index/login.jpg" alt="" />
          </div>
        </div>
      </div>
      <div class="each_step">
        <h3>• step2 選擇身分</h3>
        <p>
          &ensp;&ensp;成功登入後會進入選擇頁面，若選擇新人並成功上傳資料，之後登入會直接轉跳婚禮資訊頁面。
        </p>
        <div class="outer_teach_img">
          <div class="teach_img">
            <img src="../../img/index/ChooseIdntity.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="all_steps">
      <div class="each_step">
        <h3>• step3 填寫資料/進入婚禮</h3>
        <p>
          &ensp;&ensp;若是新人可直接填寫資料，開啟婚禮。若是賓客的婚禮代碼，進入婚禮聊天或填寫祝福牆。
        </p>
        <div class="outer_teach_img">
          <div class="teach_img">
            <img src="../../img/index/afterIdentity.jpg" alt="" />
          </div>
        </div>
      </div>
      <div class="each_step">
        <h3>• step4 開始使用</h3>
        <p>
          &ensp;&ensp;完成即可開始使用聊天、查看婚禮資訊以及祝福牆等功能，趕快開始體驗吧！
        </p>
        <div class="outer_teach_img">
          <div class="teach_img">
            <img src="../../img/index/allFunctions.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="go_top" @click="goTop">👆</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { nextTick } from "@vue/runtime-core";
export default {
  setup() {
    const dynamicIndexPhoto = ref(require("../../img/index/homePhoto1.jpg"));
    const indexPhotos = [0, [1, 2, 3, 4]];
    // const showGoTop = ref(false);

    function goTop(event) {
      // event.target.
      if (
        event.target.offsetTop + document.querySelector("html").scrollTop >
        window.innerHeight
      ) {
        window.scroll(0, 0);
      }
    }
    // let blessing_icon;

    nextTick(() => {});

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
      // showGoTop
      goTop,
    };
  },
};
</script>

<style scoped>
.teach_step {
  background-color: #f0fbfc;
  padding: 3vh 0;
  padding-bottom: 0;
}

.teach_step > h2 {
  text-align: center;
  background-color: #ffdbab;
  box-shadow: 0 0 5px 5px rgb(0 0 0 / 10%);
  margin: 0 auto;
  width: fit-content;
  border-radius: 1rem;
  padding: 0.5rem;
}

.teach_img {
  width: 50vw;
  margin: 0 auto;
  /* border-radius: 1rem; */
  /* transform: translateX(-50%); */
}

.teach_img > img {
  border-radius: 1rem;
  box-shadow: 0 0 5px 6px rgba(255, 255, 255, 0.466);
}
.each_step > * {
  margin: 1.5rem;
}
.outer_teach_img {
  width: 100%;
  padding: 0.5rem;
  margin: 0 auto;
  background: rgb(50 61 54);
  box-sizing: border-box;
}

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
  position: relative;
  max-height: 90vh;
}
.index_photo > img {
  max-width: 1000px;
}

img {
  width: 100%;
  height: 100%;
}

.introduce {
  background-color: #66c7cd;
  position: relative;
  flex: 1 1 auto;
  padding: 2rem;
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
}

.blessing_icon > img {
  width: 100%;
  height: 100%;
}

.intro_text {
  margin: 2.5rem 5vw;
  font-size: 1.5rem;
}

.intro_text_part > a {
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

.second_page {
  display: grid;
  grid-template-columns: 50% 50%;
}

.feature {
  text-align: center;
  background-color: #ebdede;
  padding: 20vh auto;
  border-bottom: 1px solid;
  padding: 2rem;
  max-width: 1000px;
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

.go_top {
  position: fixed;
  bottom: 1%;
  right: 1%;
  width: 5vh;
  height: 5vh;
  line-height: 5vh;
  text-align: center;
  background-color: rgb(38, 117, 185);
  border-radius: 50%;
  box-shadow: 0 0 3px 3px rgba(255, 255, 255, 0.466);
}

@media (min-width: 750px) {
  .introduce > .intro_text_part > * {
    margin: 3rem 10vw;
    font-size: 2.5rem;
  }

  .introduce {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

@media (min-width: 1000px) {
  .outer_introduce_background {
    background-color: #66c7cd;
  }

  .teach_step > h2 {
    padding: 1vh 2vw;
    margin: 4vh auto;
  }
  .introduce > .intro_text_part > * {
    margin: 3rem 20vw;
  }

  .outer_teach_img {
    box-shadow: 0 0 15px 15px rgba(0, 0, 0, 0.2);
  }
  .index_photo {
    display: flex;
    justify-content: center;
    background-color: black;
  }

  .all_steps {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding: 2vh 10vw;
    gap: 5vw;
    margin: 3rem 0;
  }

  .all_steps > * {
    flex: 1;
    background: snow;
    box-shadow: 0 0 5px 10px rgb(0 0 0 / 5%);
  }

  .each_step > p {
    min-height: 10vh;
  }

  .teach_img {
    width: 40%;
  }

  .introduce {
    min-height: 100vh;
  }

  .second_page {
    grid-template-columns: repeat(3, 33.3%);
    /* align-items: center; */
    justify-content: center;
    margin: 0 auto;
    padding: 1rem;
    gap: 0.5rem;
  }

  .second_page > * {
    /* margin: 0.5rem; */
  }

  .go_top:hover {
  background-color: #ffffff;
  cursor: pointer;
}
}
</style>