import { getDatabase, ref, child, get } from "firebase/database";
import getNewEmail from "../../getNewEmail";

export default function getBlessingData({store}) {
  const dbRef = ref(getDatabase());

  const sendWeddingEmail = store.getters["chat/getSelectedEmail"];
  const guestEmail = getNewEmail(
    store.getters["auth/allAuthInform"]["allAuthInform"].email
  );


  console.log(sendWeddingEmail,guestEmail);

  return get(child(dbRef, `Blessing/${sendWeddingEmail}/${guestEmail}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
