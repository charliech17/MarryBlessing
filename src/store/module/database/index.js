export default {
  namespaced: true,
  state() {
    return {
      firebaseData: null,
      selectedDatabase:localStorage['selectedWedding']|| null, //JSON.parse(localStorage['selectedWedding']) ||
    };
  },
  mutations: {
    updateFirebaseDatabase(state, payload) {
      state.firebaseData = payload;
    },
    updateSelectedDatabase(state, payload) {
      state.selectedDatabase = payload;
    },
  },
  actions: {
    updateFirebaseDatabase(context, payload) {
      context.commit("updateFirebaseDatabase", payload);
    },
    updateSelectedDatabase(context, payload) {
      context.commit("updateSelectedDatabase", payload);
    },
  },
  getters: {
    getFirebaseData(state) {
      return state.firebaseData;
    },
    getSelectedDatabase(state) {
      return state.selectedDatabase;
    },
  },
};
