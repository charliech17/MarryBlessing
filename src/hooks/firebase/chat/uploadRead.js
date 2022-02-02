import { getDatabase, child, get, ref,set } from "firebase/database"; //, ref, set

export default function uploadIsRead({
  hostEmail,
  guestEmail,
  identity,
  totalUnread,
}) {
  //hostEmail, uploadMessage,guestEmail,identity
  const db = getDatabase();
  const dbRef = ref(db);

  //檢查是host or guest
  if (identity === "host") {
    let tempGuestEmail = guestEmail;
    guestEmail = hostEmail;
    hostEmail = tempGuestEmail;
  }

  get(child(dbRef, `Chat/${hostEmail}/${guestEmail}/uploadMessage`))
    .then((savedChats) => {
      if (savedChats.exists()) {
        const firebaseChatsObject = savedChats.val();
        const newUploadMessage = [];
        const isReadArray = savedChats.val()[3];
        const getIdentity = savedChats.val()[2];

        // console.log(isReadArray);
        for (let i = 0; i < totalUnread; i++) {
            if(identity!==getIdentity[getIdentity.length-1-i]){
                isReadArray[isReadArray.length - 1 - i] = true;
            }
        }

        let i = 0;
        for (const item in firebaseChatsObject) {
          if (i === 3) {
            newUploadMessage[i] = isReadArray;
            continue;
          }
          newUploadMessage.push(firebaseChatsObject[item]);
          i++;
        }

        setData({ db, sendWeddingEmail: hostEmail, uploadMessage:newUploadMessage,guestEmail });
      } else {
        return;
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
