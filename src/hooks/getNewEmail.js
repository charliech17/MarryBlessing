export default function getNewEmail(email) {
  
    // if(!email){
    //   return;
    // }
    let newEmail = "";
    for (let i = 0; i < email.length; i++) {
      // console.log(nowTime[i]);
      if (email[i] === "." || email[i] === "@") {
        continue;
      }
      newEmail += email[i];
    }
    return newEmail;
  }