import signOrSignup from "./fetch/signinOrSignup.js";

export default {
  async setUser(context, payload) {
      await signOrSignup({context,payload});
  },
  updateError(context,payload){
    context.commit('updateError',payload);
  },
  updateSigninState(context,payload){
    context.commit('updateSigninState',payload);
  },
  updateEmail(context,payload){
    context.commit('updateEmail',payload);
  },
  updateState(context,payload){
    context.commit('updateState',payload);
  },
  resetState(context){
    context.commit('resetState');
  }
};
