import { getDatabase, ref, onValue } from "firebase/database";

export default function onUpdateChats({guestEmail,hostEmail,store}) {
  const db = getDatabase();
  const ChatRefs = ref(db, `Chat/${hostEmail}/${guestEmail}/uploadMessage`);
//   store.dispatch('chat/changeGuestMessage',[]);
  onValue(ChatRefs, (snapshot) => {
    const data = snapshot.val();
    if(!data){
        return;
    }
    store.dispatch('chat/changeGuestMessage',data);
  });
}
