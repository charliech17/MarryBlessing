import { getDatabase, child, get, ref } from "firebase/database"; //, ref, set

export default function chatListUpdate({ yourWeddingEmail, store }) {
  const db = getDatabase();
  const dbRef = ref(db);

  get(child(dbRef, `Chat/${yourWeddingEmail}`))
    .then((savedChats) => {
      if (savedChats.exists()) {
        const firebaseChatsObject = savedChats.val();
        let isReadArray = [];
        const emails = [];
        const whoSendMessage = [];

        for (const object in firebaseChatsObject) {
          isReadArray.push(firebaseChatsObject[object]["uploadMessage"][3]);
          whoSendMessage.push(firebaseChatsObject[object]["uploadMessage"][2]);
          emails.push(object);
        }

        console.log(whoSendMessage);

        store.dispatch("chat/updateNewSender", whoSendMessage);
        store.dispatch("chat/updateIsRead", isReadArray);
        store.dispatch("chat/updateHostWeddingList", emails);
      } else {
        //no data
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
