import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function isSignIn(store) {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      store.dispatch("auth/updateSigninState", true);
      store.dispatch("auth/updateEmail", user.email);
    } else {
      store.dispatch('auth/resetState');
      
      localStorage.removeItem('isNewman');
      localStorage.removeItem('selectedWedding');
      localStorage.removeItem('isGuest');
    }
  });
}
