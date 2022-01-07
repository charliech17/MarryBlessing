export default {
    namespaced: true,
    state(){
        return {
            imageInputStatus:{
                newInput: false,
                inputFile: null
            }
        };
    },
    mutations:{
        tellImageInput(state,newStatus){
            state.imageInputStatus = newStatus;
        }
    },
    actions:{
        tellImageInput(context,newStatus){
            context.commit('tellImageInput',newStatus);
        }
    },
    getters:{
        getInputStatus(state){
            return state.imageInputStatus;
        }
    }
}