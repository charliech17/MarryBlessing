export default {
    namespaced:true,
    state(){
        return {
            firebaseData: null
        }
    },
    mutations:{
        updateFirebaseDatabase(state,payload){
            state.firebaseData = payload;
        }
    },
    actions:{
        updateFirebaseDatabase(context,payload){
            context.commit('updateFirebaseDatabase',payload);
        }
    },
    getters:{
        getFirebaseData(state){
            return state.firebaseData;
        }
    }
}