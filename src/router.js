import {createRouter, createWebHistory} from 'vue-router';
import Home from './components/Page/Home.vue';
import SendBlessing from './components/SendBlessing/SendBlessing.vue';
import Login from './components/Page/Login.vue';
import Identity from './components/Page/Identity.vue';
import MerryInform from './components/identity/newMan/MerryInform';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/blessing', component: SendBlessing},
        {path: '/home', component: Home},
        {path:'/login', component:Login},
        {path:'/identity',component:Identity},
        {path:'/identity/inform',component:MerryInform},
        {path:'/',redirect: '/home'}
    ]
});

export default router;