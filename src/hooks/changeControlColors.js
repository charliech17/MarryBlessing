export default function changeControlColors({store,dispatchName,changeParameter}){
      store.dispatch(`editText/${dispatchName}`,changeParameter);
  }