<template>
  <div class="outer_background">
    <div class="inner_background">
      <addphoto-button
        :acceptType="{ type: `image`, name: '新增照片' }"
      ></addphoto-button>
       <!-- @click="updateFile('image') -->
      <addphoto-button
        :acceptType="{ type: `video`, name: '新增影片' }"
      ></addphoto-button>
      <!-- @click="updateFile('video')" -->
    </div>
  </div>
</template>

<script>
// import { useStore } from 'vuex';

import AddphotoButton from "./addphotos/AddphotoButton.vue";
export default {
  components: {
    AddphotoButton,
  },
  setup(){
    // const store =useStore();
    // function updateFile(flieType){
    //   // store.dispatch("addphoto/updateStateItem",{
    //   //   name:'inputType',
    //   //   value:flieType
    //   // });
    // }

    return {
      // updateFile
    }
  }
};
</script>

<style scoped>
.outer_background {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.inner_background{
    display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10rem;
}
.inner_background > label {
  /* width: 50%; */
  padding: 0 3rem;
  box-shadow: 0 0 5px 5px rgba(0,0,0,0.5);
  cursor: pointer;
  /* max-width: 350px; */
}

@media (min-width: 1000px) {
  .inner_background {
    background-color: rgb(255, 255, 255);
    padding: 5rem;
    border-radius: 5rem;
    border: 1px solid black;
    box-shadow: 0 0 5px 5px rgba(255,255,255,0.5);
  }

  .inner_background > label {
  /* width: 50%; */
  cursor: pointer;
  padding: 0 5rem;
  /* max-width: 350px; */
}
}
</style>