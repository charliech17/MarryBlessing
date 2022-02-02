<template>
  <div class="background" v-if="isMenuOpen">
    <div v-if="!allAuthInform.isLogin">
      <a
        v-for="(item, index) in beforeLoginItems"
        @pointerdown.prevent="enterPage(index, true)"
        :key="item"
      >
        {{ item }}
      </a>
    </div>
    <div v-else>
      <div v-if="allAuthInform.isNewman">
        <a
          v-for="(item, index) in afterLogin.newman"
          :key="item"
          @pointerdown.prevent="enterPage(index, false, true)"
          >{{ item }}</a
        >
      </div>
      <div v-else-if="!allAuthInform.isNewman && allAuthInform.isGuest">
        <a
          v-for="(item, index) in afterLogin.guest"
          :key="item"
          @pointerdown.prevent="enterPage(index, false, false)"
        >
          {{ item }}
        </a>
      </div>
      <!-- <div v-else>
        <a @pointerdown.prevent="enterPage(index, false, 1)">重選婚禮</a>
      </div> -->
      <a @pointerdown.prevent="trylogin(false)">登出</a>
    </div>
  </div>

  <!-- @pointerdown="enterPage(index)" -->
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import signout from "../../hooks/firebase/logout.js";

export default {
  setup() {
    const beforeLoginItems = reactive(["試用祝福牆", "登入/註冊"]);
    const beforeLoginPage = ["/blessing", "/login"];

    const afterLogin = reactive({
      newman: [
        "婚禮資訊 (主辦方)",
        "更改資料",
        "查看祝福牆",
        "聊天",
        "進入別人的婚禮",
      ],
      guest: ["婚禮資訊 (受邀方)", "給予祝福", "聊天", "重選婚禮", "舉辦婚禮"],
    });

    const afterLoginPage = {
      newman: [
        "/newMan/yourwedding",
        "/newMan/changeInforms",
        "",
        "/newMan/chatlist",
        "/identity/guest",
      ],
      guest: [
        "/guest/weddingInform",
        "/blessing",
        "",
        "/identity/guest",
        "/identity/inform",
      ],
    };

    const router = useRouter();
    const store = useStore();

    const isMenuOpen = computed(() => store.getters["navbar/getIsMenuOpen"]);
    const allAuthInform = computed(
      () => store.getters["auth/allAuthInform"]["allAuthInform"]
    );

    function enterPage(index, beforeLogin, isNewman) {
      store.dispatch("navbar/toggleMenuOpen", false);
      if (beforeLogin) {
        router.push(beforeLoginPage[index]);
        return;
      }

      if (isNewman === true) {
        if(index!==4){
          setNotIsGuest();
        }
        router.push(afterLoginPage.newman[index]);
        return;
      }

      if (isNewman === false) {
        router.push(afterLoginPage.guest[index]);
        return;
      }

      // router.push('/identity/guest');
    }

    function trylogin(boolen) {
      store.dispatch("navbar/toggleMenuOpen", false);
      if (boolen) {
        router.push("/login");
        return;
      }
      signout({ router, store });
    }

    function setNotIsGuest() {
      store.dispatch("auth/updateState", { name: "isGuest", value: false });
      localStorage.removeItem("isGuest");
    }

    return {
      beforeLoginItems,
      enterPage,
      isMenuOpen,
      beforeLoginPage,
      trylogin,
      allAuthInform,
      afterLogin,
      afterLoginPage,
    };
  },
};
</script>

<style scoped>
.background {
  width: 100vw;
  background-color: rgb(170, 173, 175);
  gap: 3rem;
}

.background a {
  display: block;
  list-style: none;
  text-decoration: none;
  font-size: 8vw;
  color: black;
  font-weight: 700;
  width: 100%;
  text-align: center;
  padding: 3vh 0;
  border-bottom: 1px solid black;
}

.background a:nth-child(1) {
  background-color: bisque;
}

li:hover,
li:active {
  background-color: rgb(120, 124, 59);
}

@media (min-width: 750px) {
  .background {
    display: none;
  }
}
</style>