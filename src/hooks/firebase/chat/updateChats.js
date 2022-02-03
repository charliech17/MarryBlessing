import { getDatabase, ref, onValue } from "firebase/database";

export default function onUpdateChats({ guestEmail, hostEmail, store,identity }) {
  const db = getDatabase();

  if(identity==='host'){
    let tempGuestEmail = guestEmail;
    guestEmail = hostEmail;
    hostEmail = tempGuestEmail;
  }
  const ChatRefs = ref(db, `Chat/${hostEmail}/${guestEmail}/uploadMessage`);
  
  onValue(ChatRefs, (snapshot) => {
    const data = snapshot.val();
    if (!data) {
      store.dispatch("chat/changeGuestMessage", []);
      return;
    }
    store.dispatch("chat/changeGuestMessage", data);
  });
}
