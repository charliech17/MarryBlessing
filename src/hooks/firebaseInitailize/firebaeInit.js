import { initializeApp } from "firebase/app";

export default function firebaseInit(){
    const firebaseConfig = {
        apiKey: "AIzaSyC-VFrh3xJcmAE4OoVt_71lg3gR5xzKM7Y",
        authDomain: "marryblessing-for-vue.firebaseapp.com",
        databaseURL: "https://marryblessing-for-vue-default-rtdb.firebaseio.com",
        projectId: "marryblessing-for-vue",
        storageBucket: "marryblessing-for-vue.appspot.com",
        messagingSenderId: "751587772923",
        appId: "1:751587772923:web:f59d35d15e4940cc66e35e",
      };

      const app = initializeApp(firebaseConfig);
      return app;
}