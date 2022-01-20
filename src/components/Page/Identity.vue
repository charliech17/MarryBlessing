<template>
<div class="outer_background">
  <base-card inputTitle='選擇身分'>
    <div class="icon"><img src="../../img/identity/new.png" /></div>
    <base-button class="purple" @click="newMan">新人</base-button>
    <div class="icon"><img src="../../img/identity/guest.png" /></div>
    <base-button class="purple" @click="guest">賓客</base-button>
  </base-card>
  </div>
</template>




<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    function newMan() {
      router.replace("/identity/inform");
    }

    function guest() {
      router.replace("/");
    }

    return {
      newMan,
      guest,
    };
  },
};
</script>

<style scoped>
.outer_background{
    height: 100%;
    /* background-color: black; */
    background-image: url('../../img/identity/inform.jpg');
    background-size: cover;
    background-position: center;
}

button {
  display: block;
  margin: 0 auto;
  margin-bottom: 2rem;
  padding: 2.5rem;
  font-weight: 800;
}

.icon {
  width: 15%;
  margin: 0.5rem auto;
}

img {
  width: 100%;
  height: 100%;
}
</style>