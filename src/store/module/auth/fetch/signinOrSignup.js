import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default async function signOrSignup({context,payload}){
    // console.log(payload.isSignin,'trurture');
    let url = ''
    if(payload.isSignin){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-VFrh3xJcmAE4OoVt_71lg3gR5xzKM7Y';
        signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
    }else{
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-VFrh3xJcmAE4OoVt_71lg3gR5xzKM7Y'
    }

    const response = await fetch(
        url,
        {
          method: "POST",
          contenttype: "application/json",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
  
      const responseDate = await response.json();
      let error = null;
      if(!response.ok){
          // console
          error = (JSON.stringify(responseDate.error.message) || 'failed to authenticated');
          context.commit('updateError',error);
          throw new Error(error);
      }
  
      context.commit('setUser',{
          idToken: responseDate.idToken,
          localId:responseDate.localId,
          expiresIn:responseDate.expiresIn,
          email:responseDate.email,
      });
}