import getNewEmail from "../getNewEmail.js";
import {computed} from 'vue'
export default function getAllDatabase(store){
    const AllFirebasDatbase = computed(
        () => store.getters["firebaseDatabase/getFirebaseData"]
      );
      const thisDatabaseEmail = computed(() =>
      getNewEmail(store.getters["auth/allAuthInform"]["allAuthInform"].email)
    );

    return {AllFirebasDatbase,thisDatabaseEmail};
}