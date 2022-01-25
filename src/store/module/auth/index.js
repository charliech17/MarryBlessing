import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
    namespaced:true,
    state(){
        return{
            idToken : null,
            localId : null,
            expiresIn : null,
            error: null,
            email:null,
            isLogin: false,
            isNewman: localStorage['isNewman']||false,
            isGuest: localStorage['isGuest']||false
        }
    },
    mutations,
    actions,
    getters,
};