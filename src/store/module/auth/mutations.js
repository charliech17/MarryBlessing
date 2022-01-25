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
  updateSigninState(state, payload) {
    state.isLogin = payload;
  },
  updateEmail(state, payload) {
    state.email = payload;
  },
  updateState(state, payload) {
    state[payload.name] = payload.value;
  },
  resetState(state) {
    Object.assign(state, {
      idToken: null,
      localId: null,
      expiresIn: null,
      error: null,
      email: null,
      isLogin: false,
      isNewman: false,
      isGuest: false,
    });
  },
};
