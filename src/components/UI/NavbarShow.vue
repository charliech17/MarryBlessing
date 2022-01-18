<template>
  <div class="background" v-if="isMenuOpen">
    <a
      v-for="(item, index) in menuItems"
      @pointerdown.prevent="enterPage(index)"
      :key="item"
    >
      {{ item }}
    </a>
  </div>
  <!-- @pointerdown="enterPage(index)" -->
</template>

<script>
import { computed, reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const menuItems = reactive(["進入祝福牆", "開啟祝福牆", "登入/註冊"]);
    const page = reactive(["/", "/blessing", "/login"]);
    const router = useRouter();
    const store = useStore();
    const isMenuOpen = computed(() => store.getters["navbar/getIsMenuOpen"]);

    function enterPage(index) {
      router.push(page[index]);
      store.dispatch("navbar/toggleMenuOpen", false);
    }

    return {
      menuItems,
      enterPage,
      isMenuOpen,
      page
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

.background>a {
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

.background > a:nth-child(1) {
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