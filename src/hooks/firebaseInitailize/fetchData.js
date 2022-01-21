import getNewEmail from '../getNewEmail.js';
export default async function fetchDatePut({
  isHost,
  savePlace,
  saveData,
  store,
}) {
  let hostOrGuest = "Host";
  if (!isHost) {
    hostOrGuest = "Guest";
  }

  const email =getNewEmail(store.getters["auth/allAuthInfrom"]["allAuthInfrom"].email);
  const idToken = store.getters["auth/allAuthInfrom"]["allAuthInfrom"].idToken;
  // const nowTime = getNowTime();

  fetch(
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

// function getNewEmail(email) {
  
//   let newEmail = "";
//   for (let i = 0; i < email.length; i++) {
//     // console.log(nowTime[i]);
//     if (email[i] === "." || email[i] === "@") {
//       continue;
//     }
//     newEmail += email[i];
//   }
//   return newEmail;
// }
