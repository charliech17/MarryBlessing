<template>
  <div class="the_header">
    <h2 class="brand">Marry Blessings</h2>
    <div class="switch_page_button">
      <h3>進入祝福牆</h3>
      <h3 @click="enterPage('/send_blessing')">開啟祝福牆</h3>
      <h3>登入/註冊</h3>
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
  background-color: rgb(94, 20, 20);
  color: white;
  height: 10vh;
  position: relative;
}

.brand {
  margin-left: 1rem;
  cursor: pointer;
}

.switch_page_button {
  display: none;
}

.switch_page_button > * {
  margin-right: 2rem;
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