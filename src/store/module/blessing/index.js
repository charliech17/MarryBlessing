import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default {
    namespaced: true,
    state(){
        return{
            clickAddText:false,
            blessingText:[],
            isEditText:{
                isEditing : false,
                editId: null
            },
            initialInputs:{
                lastId:null,
                color:'rgb(0,0,0)'
            },
            isTextMove: false,
            wantDelete: false,
        }

    },
    getters,
    mutations,
    actions
};