import signOrSignup from "./fetch/signinOrSignup.js";

export default {
  login() {},
  async setUser(context, payload) {
      await signOrSignup({context,payload});
  },
  updateError(context,payload){
    context.commit('updateError',payload);
  }
};
