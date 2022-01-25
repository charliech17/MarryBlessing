import { initializeApp } from "@firebase/app";


export default function firebaseInit() {
  // console.log(true,process.env.VUE_APP_FIREBASE_API_KEY);
  const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY, //"AIzaSyC-VFrh3xJcmAE4OoVt_71lg3gR5xzKM7Y",
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN, //"marryblessing-for-vue.firebaseapp.com",
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL, //"https://marryblessing-for-vue-default-rtdb.firebaseio.com",
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID, //"marryblessing-for-vue",
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET, //"marryblessing-for-vue.appspot.com",
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID, //"751587772923",
    appId: process.env.VUE_APP_FIREBASE_APP_ID, //"1:751587772923:web:f59d35d15e4940cc66e35e",
  };

  const app = initializeApp(firebaseConfig);
  return app;
}
