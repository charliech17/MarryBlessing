<template>
  <div class="background">
    
    <section class="view_all_blessing">
      <h2>{{ author }}</h2>
      <div class="preview_img" @click="viewBlessing">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/marryblessing-for-vue.appspot.com/o/blessings%2F94CAA8E0-763D-4090-992C-325060502030.jpeg?alt=media&token=cc9e69ff-dd2b-4652-9f58-5eb67c490fcd"
          alt=""
        />
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRouter } from "vue-router";
import {useStore} from 'vuex'
import getData from '../../../../hooks/firebase/blessing/getData.js'

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    function viewBlessing() {
      router.push("/newMan/viewblessing");
    }


    const author = ref('');
    getData({store}).then(data=>{
      for(const datum in data){
        author.value = data[datum].username;
        // console.log(data[datum].username);
      }
    });
    // console.log(data);

    return {
      viewBlessing,
      author
    };
  },
};
</script>

<style scoped>
.background {
  background-color: rgb(255, 255, 255);
  margin: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  max-width: 500px;
  min-height: 50vh;
}

.view_all_blessing {
  text-align: center;
}

.preview_img {
  max-width: 50vw;
  margin: 0 auto;
}

.preview_img > img {
  width: 100%;
  border-radius: 0.5rem;
}
</style>