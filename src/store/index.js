import {createStore} from 'vuex';
import blessingModule from './module/blessing/index.js';
import navbarModule from './module/navbar/index.js';
import addphotoModule from './module/addphoto/index.js';

const store = createStore({
    modules:{
        blessing: blessingModule,
        navbar: navbarModule,
        addphoto:addphotoModule
    }
});

export default store;