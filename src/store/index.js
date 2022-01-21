import { createStore } from "vuex";
import blessingModule from "./module/blessing/index.js";
import navbarModule from "./module/navbar/index.js";
import addphotoModule from "./module/addphoto/index.js";
import editTextModule from "./module/editText/index.js";
import authModule from "./module/auth/index.js";
import firebaseDatabaseModule from './module/database/index.js';

const store = createStore({
  modules: {
    blessing: blessingModule,
    navbar: navbarModule,
    addphoto: addphotoModule,
    editText: editTextModule,
    auth: authModule,
    firebaseDatabase: firebaseDatabaseModule
  },
});

export default store;
