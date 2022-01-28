<template>
  <div class="outer_background">
      <div class="buttons">
        <base-button class="purple" @pointerdown.prevent="gotoPage(0)"
          >婚禮資訊</base-button
        >
        <base-button class="purple" @pointerdown.prevent="gotoPage(1)"
          >更改資料</base-button
        >
        <base-button class="purple" @pointerdown.prevent="gotoPage(2)"
          >查看祝福牆</base-button
        >
        <base-button class="purple" @pointerdown.prevent="gotoPage(3)"
          >增加照片</base-button
        >
      </div>

      <router-view></router-view>
    </div>
</template>

<script>
// import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  setup() {
    const routerLink = ["/newMan/yourwedding", "/newMan/changeInforms"];

    // function getThisDatabase(thisDb) {
    //   thisDatabase.value = thisDb;
    // }

    const router = useRouter();
    function gotoPage(number) {
      // console.log(routerLink[number],router);
      router.push(routerLink[number]);
    }

    return {
      // thisDatabase,
      // getThisDatabase,
      gotoPage,
    };
  },
};
</script>

<style scoped>
.outer_background {
  background-image: url("../../../img/identity/inform.jpg");
  /* height: 100%; */
  min-height: 100%;
  background-size: cover;
}

/* .inner_background{
  height: 120%;
} */

.buttons {
  text-align: center;
  padding: 1.2rem 0;
}

.buttons > button {
  font-size: 1rem;
  /* padding: .2rem .5rem; */
  /* width: 33%; */
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
}

/* .inner_contents {
  margin: 1.5rem;
}

img {
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
} */
/* .newManName {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.newManName > span {
  display: inline-block;
  background: rgb(74 12 74);
  color: white;
  border-radius: 0.5rem;
  font-weight: 900;
  padding: 0.5rem;
} */
</style>