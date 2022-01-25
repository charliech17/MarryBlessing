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
      localStorage.removeItem('isNewman');
      localStorage.removeItem('selectedWedding');
      localStorage.removeItem('isGuest');

      console.log("sign out!!");
    })
    .catch((error) => {
      console.log(error);
    });
}
