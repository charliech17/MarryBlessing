import { getDatabase, ref, onValue } from "firebase/database";

export default function onUpdateChats({guestEmail,hostEmail,store}) {
  const db = getDatabase();
  const ChatRefs = ref(db, `Chat/${hostEmail}/${guestEmail}/uploadMessage`);
  onValue(ChatRefs, (snapshot) => {
    const data = snapshot.val();
    store.dispatch('chat/changeGuestMessage',data);
    console.log(store.getters["chat/getGuestNowWeddingMessage"]);
  });
}