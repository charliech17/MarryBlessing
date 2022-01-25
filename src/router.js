import {createRouter, createWebHistory} from 'vue-router';
import { defineAsyncComponent } from 'vue';
import Home from './components/Page/Home.vue';

const SendBlessing = defineAsyncComponent(()=>import('./components/SendBlessing/SendBlessing.vue'))
const Login = defineAsyncComponent(()=>import('./components/Page/Login.vue'));
const Identity = defineAsyncComponent(()=>import('./components/Page/Identity.vue'));
const MerryInform = defineAsyncComponent(()=>import('./components/identity/newMan/MerryInform'));
const NewMan = defineAsyncComponent(()=>import('./components/identity/newMan/NewMan.vue'));
const ConfirmWedding = defineAsyncComponent(()=>import('./components/identity/guest/ConfirmWedding.vue'));
const EnterWedding = defineAsyncComponent(()=>import('./components/identity/guest/EnterWedding.vue'));

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/blessing', component: SendBlessing},
        {path: '/home', component: Home},
        {path:'/login', component:Login},
        {path:'/identity',component:Identity},
        {path:'/identity/inform',component:MerryInform},
        {path:'/identity/newMan',component:NewMan},
        {path:'/identity/guest',component:ConfirmWedding},
        {path:'/identity/wedding',component:EnterWedding},
        {path:'/',redirect: '/home'}
    ]
});

export default router;