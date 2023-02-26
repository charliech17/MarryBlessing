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
const YourWedding = defineAsyncComponent(()=>import('./components/identity/newMan/newman components/YourWedding.vue'));
const ChangeInforms = defineAsyncComponent(()=>import('./components/identity/newMan/newman components/ChangeInforms.vue'));
const WeddingInform = defineAsyncComponent(()=>import('./components/identity/guest/guest components/OtherWedding.vue'));
const ChatWedding = defineAsyncComponent(()=>import('./components/identity/guest/guest components/ChatWedding.vue'));
const ChatList = defineAsyncComponent(()=>import('./components/identity/newMan/newman components/ChatList.vue'));
const BlessingStart = defineAsyncComponent(()=>import('./components/SendBlessing/BlessingStart.vue'));
const PreviewBlessing = defineAsyncComponent(()=>import('./components/identity/newMan/newman components/PreviewBlessing.vue'));
const ViewBlessing = defineAsyncComponent(()=>import('./components/identity/newMan/newman components/ViewBlessing.vue'));

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/home', component: Home},
        {path:'/login', component:Login},
        {path:'/identity',component:Identity},
        {path:'/identity/inform',component:MerryInform},
        {path:'/identity/newMan',component:NewMan, children:[
            {path:'/newMan/yourwedding',component:YourWedding},
            {path:'/newMan/changeInforms',component:ChangeInforms},
            {path:'/newMan/chatlist',component:ChatList},
            {path:'/newMan/chat',component:ChatWedding},
            {path:'/newMan/previewblessing',component: PreviewBlessing},
            {path:'/newMan/viewblessing',component: ViewBlessing},
        ]},
        {path:'/identity/guest',component:ConfirmWedding},
        {path:'/guest/wedding',component:EnterWedding,children:[
            {path:'/guest/weddingInform',component: WeddingInform},
            {path:'/guest/chat',component:ChatWedding },
        ]},
        {path:'/blessingStart',component:BlessingStart},
        {path: '/blessing', component: SendBlessing},
        {path:'/',redirect: '/home'}
    ]
});

export default router;