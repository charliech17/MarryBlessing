<template>
  <div class="the_header">
    <!-- <h2 class="brand">Marry Blessings</h2> -->
    <router-link to="/home" class="brand">Marry Blessings</router-link>
    <div class="switch_page_button">
      <router-link to="/">進入祝福牆</router-link>
      <!-- <h3>進入祝福牆</h3> -->
      <router-link to="/blessing">開啟祝福牆</router-link>
      <!-- <h3 @click="enterPage('/send_blessing')">開啟祝福牆</h3> -->
      <!-- <h3>登入/註冊</h3> -->
      <router-link to="/login">登入/註冊</router-link>
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
export default {
  components: { NavbarCollapse, NavbarShow },
  setup() {
    const router = useRouter();

    function enterPage(page) {
      router.replace(page);
      //'/send_blessing'
    }

    return { enterPage };
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
  /* margin-right: 2rem; */
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 900;
  border: 1px white solid;
  text-align: center;
  display: inline-block;
  /* padding: 0.3rem; */
  box-shadow: 0 0 3px 5px rgba(245, 193, 124,.5);
}

.switch_page_button > *:hover,
.switch_page_button > *:active{
  color: rgb(50, 52, 121);
  background-color: wheat;
}

@media (min-width: 750px) {
  .switch_page_button {
    display: flex;
    cursor: pointer;
    position: absolute;
    right: 0;
  }
  .brand {
    margin-left: 2rem;
  }
}
</style>