import { createApp } from 'vue';

import App from './App.vue';

import TheHeader from './components/UI/TheHeader.vue';
import BaseButton from './components/Base/BaseButton.vue';
import BaseDialog from './components/Base/BaseDialog.vue';
import BaseSpinner from './components/Base/BaseSpinner.vue';
import BaseCard from './components/Base/BaseCard.vue';

import router from './router.js';
import store from './store/index.js';



const app = createApp(App);

app.use(router);
app.use(store);

app.component('the-header',TheHeader);
app.component('base-button',BaseButton);
app.component('base-dialog',BaseDialog);
app.component('base-spinner',BaseSpinner);
app.component('base-card',BaseCard);

app.mount('#app')
