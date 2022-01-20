import { createStore } from "vuex";
import blessingModule from "./module/blessing/index.js";
import navbarModule from "./module/navbar/index.js";
import addphotoModule from "./module/addphoto/index.js";
import editTextModule from "./module/editText/index.js";
import authModule from "./module/auth/index.js";

const store = createStore({
  modules: {
    blessing: blessingModule,
    navbar: navbarModule,
    addphoto: addphotoModule,
    editText: editTextModule,
    auth: authModule,
  },
});

export default store;
