export default {
  //   login() {},
  setUser(state, payload) {
    state.idToken = payload.idToken;
    state.localId = payload.localId;
    state.expiresIn = payload.expiresIn;
    state.email = payload.email;
    // state.error = payload.error;
    console.log(state);
  },
  updateError(state, payload) {
    state.error = payload;
  },
};
