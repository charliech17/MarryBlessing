<template>
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
  />
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import { useStore } from "vuex";
import fireBaseInit from "./hooks/firebase/firebaeInit.js";
import onUpdateDate from "./hooks/firebase/onUpdateData.js";
import isSignin from "./hooks/firebase/isSignIn.js"

export default {
  setup() {
    fireBaseInit();
    onUpdateDate(useStore());
    isSignin(useStore());
  },
};
</script>
  

<style>
html,
body {
  margin: 0;
  min-height: -webkit-fill-available;
  transition: scroll 1s ease-in-out;
  scroll-behavior: smooth;
}

#app {
  height: 100%;
}

.warning {
  color: brown;
  margin: 0;
  text-align: end;
  font-size: 15px;
}

@media (min-width: 1000px) {
  body {
    background-color: rgb(34, 41, 65);
  }

  .warning {
    font-size: 1.5rem;
  }
}
</style>
