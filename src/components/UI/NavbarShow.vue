<template>
  <div class="background" v-if="isMenuOpen">
    <li v-for="(item,index) in menuItems" :key="item" @click="enterPage(index)">{{item}}</li>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/reactivity';
import {useRouter} from 'vue-router';
import { useStore } from 'vuex';

export default {
    setup() {
        const menuItems = reactive(['進入祝福牆','開啟祝福牆','登入/註冊']);    
        const page = reactive(['','/send_blessing','']);
        const router = useRouter();
        const store = useStore();
        const isMenuOpen = computed(()=>store.getters['navbar/getIsMenuOpen']);


        function enterPage(index){
            router.push(page[index]);
            store.dispatch('navbar/toggleMenuOpen',false);
        }

        return {
            menuItems,
            enterPage,
            isMenuOpen
        };
    },
}
</script>

<style scoped>
.background{
    height: 90vh;
    width: 100vw;
    background-color: rgb(170, 173, 175);
    /* position: fixed;
    z-index: 99; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 3rem;
}

li {
    list-style: none;
    padding: 0;
    font-size: 8vw;
    margin: 0 1rem;
}

div>li:nth-child(1){
    background-color: bisque;
}

li:hover,
li:active{
    background-color: rgb(120, 124, 59);
}

@media (min-width: 750px) {
  .background{
      display: none;
  }
}
</style>