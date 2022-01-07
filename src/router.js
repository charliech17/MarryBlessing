import {createRouter, createWebHistory} from 'vue-router';
import Home from './components/Page/Home.vue';
import SendBlessing from './components/SendBlessing/SendBlessing.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/send_blessing', component: SendBlessing},
        {path: '/home', component: Home},
        {path:'/',redirect: '/home'}
    ]
});

export default router;