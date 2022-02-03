import { getDatabase,  ref , onValue} from "firebase/database"; //, ref, set child, get,

export default function chatListUpdate({ yourWeddingEmail, store }) {
  const db = getDatabase();
  
  const ChatRefs = ref(db, `Chat/${yourWeddingEmail}`);

  onValue(ChatRefs, (snapshot) => {
    const data = snapshot.val();
    const firebaseChatsObject = snapshot.val();
    if (!data) {
      return;
    }

    let isReadArray = [];
    const emails = [];
    const whoSendMessage = [];

    for (const object in firebaseChatsObject) {
      isReadArray.push(firebaseChatsObject[object]["uploadMessage"][3]);
      whoSendMessage.push(firebaseChatsObject[object]["uploadMessage"][2]);
      emails.push(object);
    }

    store.dispatch("chat/updateNewSender", whoSendMessage);
    store.dispatch("chat/updateIsRead", isReadArray);
    store.dispatch("chat/updateHostWeddingList", emails);
  });
}
