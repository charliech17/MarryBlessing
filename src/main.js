import { createApp } from 'vue';

import App from './App.vue';

import TheHeader from './components/UI/TheHeader.vue';
import BaseButton from './components/Base/BaseButton.vue';

import router from './router.js';
import store from './store/index.js';



const app = createApp(App);

app.use(router);
app.use(store);

app.component('the-header',TheHeader);
app.component('base-button',BaseButton);

app.mount('#app')
