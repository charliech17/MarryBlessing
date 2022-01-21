import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
// import { getAuth, signInAnonymously } from "firebase/auth";

export default function onUpdateData(store) {
  //先驗證再更新到最新資料庫  
  getAuth();
  afterLogin(store);
}

function afterLogin(store) {
  const db = getDatabase();
  const host = ref(db, "Host/");
  onValue(host, (snapshot) => {
    const data = snapshot.val();
    // data;
    //將data 存入store中
    store.dispatch('firebaseDatabase/updateFirebaseDatabase',data);
    console.log(store.getters['firebaseDatabase/getFirebaseData']);
  });
}
