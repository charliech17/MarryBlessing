import getNewEmail from '../getNewEmail.js';
export default async function fetchDatePut({
  isHost,
  savePlace,
  saveData,
  store,
  remove
}) {
  
  let hostOrGuest = "Host";
  if (!isHost) {
    hostOrGuest = "Guest";
  }

  
  const email =getNewEmail(store.getters["auth/allAuthInform"]["allAuthInform"].email);
  const idToken = store.getters["auth/allAuthInform"]["allAuthInform"].idToken;

  if(remove===true){
    fetchDelete({hostOrGuest,savePlace,email,idToken});
    console.log(hostOrGuest,savePlace,email,idToken);
    return;
  }

  // fetch(
  //   `https://marryblessing-for-vue-default-rtdb.firebaseio.com/${hostOrGuest}/${savePlace}_${email}.json?auth=${idToken}`,
  //   {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(saveData),
  //   }
  // );
 await fetchPut({hostOrGuest,savePlace,email,idToken,saveData});
}

async function fetchDelete({hostOrGuest,savePlace,email,idToken}){
  fetch(
    `https://marryblessing-for-vue-default-rtdb.firebaseio.com/${hostOrGuest}/${savePlace}_${email}.json?auth=${idToken}`,
    {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

async function fetchPut({hostOrGuest,savePlace,email,idToken,saveData}){
  await fetch(
    `https://marryblessing-for-vue-default-rtdb.firebaseio.com/${hostOrGuest}/${savePlace}_${email}.json?auth=${idToken}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveData),
    }
  );
}
