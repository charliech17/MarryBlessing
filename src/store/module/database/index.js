export default {
  namespaced: true,
  state() {
    return {
      firebaseData: null,
      selectedDatabase:localStorage['selectedWedding']|| null, //JSON.parse(localStorage['selectedWedding']) ||
      yourWeddingDatabase:localStorage['yourWeddingDatabase']||null
    };
  },
  mutations: {
    updateFirebaseDatabase(state, payload) {
      state.firebaseData = payload;
    },
    updateSelectedDatabase(state, payload) {
      state.selectedDatabase = payload;
    },
    updateYourWeddingDatabase(state,payload){
      state.yourWeddingDatabase = payload;
    },
    resetWedding(state){
      state.selectedDatabase = null;
      state.yourWeddingDatabase = null;
    }
  },
  actions: {
    updateFirebaseDatabase(context, payload) {
      context.commit("updateFirebaseDatabase", payload);
    },
    updateSelectedDatabase(context, payload) {
      context.commit("updateSelectedDatabase", payload);
    },
    updateYourWeddingDatabase(context,payload){
      context.commit("updateYourWeddingDatabase",payload);
    },
    resetWedding(context){
      context.commit("resetWedding");
    }
  },
  getters: {
    getFirebaseData(state) {
      return state.firebaseData;
    },
    getSelectedDatabase(state) {
      return state.selectedDatabase;
    },
    getYourWeddingDatabase(state){
      return state.yourWeddingDatabase;
    }
  },
};
