import { getDatabase, child, get, ref, set } from "firebase/database"; //, ref, set

export default function uploadChat({ hostEmail, uploadMessage,guestEmail,identity }) {
  const db = getDatabase();
  const dbRef = ref(db);

  //檢查是host or guest
  if(identity==='host'){
    let tempGuestEmail = guestEmail;
    guestEmail = hostEmail;
    hostEmail = tempGuestEmail;
  }

  get(child(dbRef, `Chat/${hostEmail}/${guestEmail}`))
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

        setData({ db, sendWeddingEmail: hostEmail, uploadMessage:newUploadMessage,guestEmail });
      } else {
        setData({ db, sendWeddingEmail: hostEmail, uploadMessage,guestEmail });
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
