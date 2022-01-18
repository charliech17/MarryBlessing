import {createRouter, createWebHistory} from 'vue-router';
import Home from './components/Page/Home.vue';
import SendBlessing from './components/SendBlessing/SendBlessing.vue';
import Login from './components/Page/Login.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/blessing', component: SendBlessing},
        {path: '/home', component: Home},
        {path:'/login', component:Login},
        {path:'/',redirect: '/home'}
    ]
});

export default router;