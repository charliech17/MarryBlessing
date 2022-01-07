export default {
    getBlessingText(state){
        return state.blessingText;
    },
    isAddedText(state){
        return state.clickAddText;
    },
    isEditText(state){
        return state.isEditText;
    },
    getInitialInputs(state){
        return state.initialInputs;
    },
    getIsTextMoving(state){
        return state.isTextMove;
    },
    getWantDelete(state){
        return state.wantDelete;
    }
};