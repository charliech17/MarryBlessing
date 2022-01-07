export default {
  addBlessingText(state, text) {
    state.blessingText.push(text);
  },
  isAddingText(state, boolen) {
    state.clickAddText = boolen;
  },
  editBlessingText(state, change) { //change 為需要修改的參數
    const changeValue = state.blessingText.findIndex(
      (changeBlessing) => changeBlessing.id === change.id
    );

    for (const changeParameter in change.changeParameters) {
      if (state.blessingText[changeValue][`${changeParameter}`]) {
        state.blessingText[changeValue][`${changeParameter}`] =
          change.changeParameters[changeParameter];
        continue;
      }
      state.blessingText[changeValue]["style"][`${changeParameter}`] =
        change.changeParameters[changeParameter];
    }
  },
  isEditingText(state, editObject) {
    state.isEditText = editObject;
  },
  setInitialValues(state, initialValues) {
    state.initialInputs = initialValues;
  },
  deleteBlessing(state, id) {
    const deleteIndex = state.blessingText.findIndex(
      (deleteText) => deleteText.id === id
    );
    if (deleteIndex >= 0) {
      state.blessingText.splice(deleteIndex, 1);
    }
  },
  isTextMoving(state,boolen){
    state.isTextMove = boolen;
  },
  tryToDelete(state,boolen){
    state.wantDelete = boolen;
  }
};
