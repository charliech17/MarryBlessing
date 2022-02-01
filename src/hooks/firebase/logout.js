import { getAuth, signOut } from "firebase/auth";

export default function signout({router,store}) {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      //更換navbar
      store.dispatch('auth/updateState',{name:'isNewman',value:false});
      store.dispatch('auth/updateState',{name:'isGuest',value:false});

      //移回首頁
      router.replace("/home");

      //重設auth 和 lcoalStorage
      store.dispatch('auth/resetState');

      //重設thisWedding 和 selected wedding
      store.dispatch('firebaseDatabase/resetWedding');
      //在頁面中載入時 用local storage

      localStorage.removeItem('isNewman');
      localStorage.removeItem('selectedWedding');
      localStorage.removeItem('isGuest');
      localStorage.removeItem('idToken');
      localStorage.removeItem('yourWeddingDatabase');
      localStorage.removeItem('email');
      localStorage.removeItem('selectedWeddingEmail');

      console.log("sign out!!");
    })
    .catch((error) => {
      console.log(error);
    });
}
