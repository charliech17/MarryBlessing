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

  const idToken = store.getters["auth/allAuthInfrom"]["allAuthInfrom"].idToken;
  const nowTime = getNowTime();

  fetch(
    `https://marryblessing-for-vue-default-rtdb.firebaseio.com/${hostOrGuest}/${savePlace}_${nowTime}.json?auth=${idToken}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveData),
    }
  );
}

function getNowTime() {
  const nowTime = new Date().toISOString();
  let newNowTime = "";
  for (let i = 0; i < nowTime.length; i++) {
    // console.log(nowTime[i]);
    if (nowTime[i] === "." || nowTime[i] === ":" || nowTime[i] === "-") {
      continue;
    }
    newNowTime += nowTime[i];
  }
  return newNowTime;
}

// function method/.
