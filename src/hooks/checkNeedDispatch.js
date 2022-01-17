export default function checkNeedDispatch({store,dispatchName,changeParameter}){
    // if(textArea().id==='root'){
      store.dispatch(`editText/${dispatchName}`,changeParameter);
    // }
  }