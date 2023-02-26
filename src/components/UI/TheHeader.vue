<template>
  <div class="the_header" id="navHeader">
    <router-link to="/home" class="brand">Marry Blessings</router-link>
    <div class="switch_page_button" v-if="!allAuthInform.isLogin">
      <router-link to="/blessingStart">試用祝福牆</router-link>
      <router-link to="/login">登入/註冊</router-link>
    </div>
    <div v-if="allAuthInform.isNewman" class="switch_page_button">
      <router-link to="/newMan/yourwedding" @pointerdown.prevent="setNotIsGuest">您的婚禮資訊</router-link>
      <router-link to="/identity/guest">進入別人的婚禮</router-link>
      <router-link to="/home" @pointerdown.prevent="trylogin(false)"
        >登出</router-link
      >
    </div>
    <div
      v-else-if="!allAuthInform.isNewman && allAuthInform.isGuest"
      class="switch_page_button"
    >
      <router-link to="/identity/guest">重選婚禮</router-link>
      <router-link to="/identity/inform">舉辦婚禮</router-link>
      <router-link to="/home" @pointerdown.prevent="trylogin(false)"
        >登出</router-link
      >
    </div>

    <navbar-collapse></navbar-collapse>
  </div>
  <navbar-show></navbar-show>
</template>

<script>
// import { ref } from '@vue/reactivity';
import NavbarCollapse from "./NavbarCollapse.vue";
import NavbarShow from "./NavbarShow.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "@vue/reactivity";
import signout from "../../hooks/firebase/logout.js";
export default {
  components: { NavbarCollapse, NavbarShow },
  setup() {
    const router = useRouter();
    const store = useStore();

    const allAuthInform = computed(
      () => store.getters["auth/allAuthInform"]["allAuthInform"]
    );

    function enterPage(page) {
      router.replace(page);
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

    return { enterPage, allAuthInform, trylogin,setNotIsGuest };
  },
};
</script>

<style scoped>
.the_header {
  display: flex;
  align-items: center;
  background-color: rgb(255, 255, 255);
  height: 10vh;
  position: relative;
  box-shadow: 0 0 3px 5px rgba(0, 0, 0, 0.2);
}

.brand {
  margin-left: 1rem;
  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  color: black;
}

.switch_page_button {
  display: none;
}

.switch_page_button > * {
  margin-right: 2rem;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 900;
  text-align: center;
  display: inline-block;
  box-shadow: 0 0 3px 5px rgba(245, 193, 124, 0.5);
  border-radius: 5px;
  color: #6a377a;
}

.switch_page_button > *:hover,
.switch_page_button > *:active {
  color: rgb(252, 252, 252);
  background-color: rgb(235, 213, 166);
}

@media (min-width: 750px) {
  .switch_page_button {
    display: flex;
    cursor: pointer;
    position: absolute;
    right: 0;
    justify-content: center;
    align-items: flex-start;
  }
  .brand {
    margin-left: 2rem;
  }
}
</style>