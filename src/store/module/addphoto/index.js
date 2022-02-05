export default {
    namespaced: true,
    state(){
        return {
            imageInputStatus:{
                newInput: false,
                inputFile: null,
            },
            inputType:null
        };
    },
    mutations:{
        tellImageInput(state,newStatus){
            state.imageInputStatus = newStatus;
        },
        updateStateItem(state,payload){
            state[payload.name] = payload.value;
        }
    },
    actions:{
        tellImageInput(context,newStatus){
            context.commit('tellImageInput',newStatus);
        },
        updateStateItem(context,payload){
            context.commit('updateStateItem',payload);
        }
    },
    getters:{
        getInputStatus(state){
            return state.imageInputStatus;
        },
        getStateItem(state){
            return state;
        }
    }
}