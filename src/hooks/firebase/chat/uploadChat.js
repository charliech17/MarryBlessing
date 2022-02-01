import { getDatabase, child, get, ref, set } from "firebase/database"; //, ref, set

export default function uploadChat({ sendWeddingEmail, uploadMessage,guestEmail }) {
  //,uploadMessage
  const db = getDatabase();
  const dbRef = ref(db);

  //
  get(child(dbRef, `Chat/${sendWeddingEmail}/${guestEmail}`))
    .then((savedChats) => {
      if (savedChats.exists()) {

        const firebaseChatsObject = savedChats.val().uploadMessage;
        const newUploadMessage = [];
        
        let i=0;
        for (const item in firebaseChatsObject) {
          newUploadMessage.push(firebaseChatsObject[item]);
          newUploadMessage[i].push(...uploadMessage[i]);
          i++;
        }

        setData({ db, sendWeddingEmail, uploadMessage:newUploadMessage,guestEmail });
      } else {
        setData({ db, sendWeddingEmail, uploadMessage,guestEmail });
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function setData({ db, sendWeddingEmail, uploadMessage,guestEmail }) {
  set(ref(db, `Chat/${sendWeddingEmail}/${guestEmail}`), {
    username: "",
    uploadMessage,
  });
}
