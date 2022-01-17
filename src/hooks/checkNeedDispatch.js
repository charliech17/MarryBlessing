export default function checkNeedDispatch({store,textArea,dispatchName,changeParameter}){
    if(textArea().id==='root'){
      store.dispatch(`editText/${dispatchName}`,changeParameter);
    }
  }