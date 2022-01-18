<template>
  <div class="collapse" @click="toggleOpen">
    <img src="../../img/menu.png" alt="" />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const menuOpen = computed(() => store.getters["navbar/getIsMenuOpen"]);

    function toggleOpen() {
      store.dispatch("navbar/toggleMenuOpen", !menuOpen.value);
    }

    return {
      toggleOpen,
    };
  },
};
</script>

<style scoped>
.collapse {
  width: 3rem;
  height: 3rem;
  position: absolute;
  right: 1%;
  /* background-image: url('../../img/menu.png'); */
  /* background-size: cover;
  background-position: center; */
}

.collapse > img {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}

.collapse > img:hover,
.collapse > img:active {
  outline: rgb(3, 3, 253) solid 1.5px;
}

ul > li {
  list-style: none;
}

@media (min-width: 750px) {
  .collapse {
    display: none;
  }
}
</style>