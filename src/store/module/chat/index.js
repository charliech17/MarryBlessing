export default {
    namespaced:true,
    state(){
        return {
            guestNowWeddingMessage:[], //在進入婚禮後切換
            selectedEmail: localStorage['selectedWeddingEmail']||'',
        }
    },
    mutations:{
        changeGuestMessage(state,payload){
            state.guestNowWeddingMessage = payload;
        },
        updateSelectedEmail(state,payload){
            state.selectedEmail = payload
        }
    },
    actions:{
        changeGuestMessage(context,payload){
            context.commit("changeGuestMessage",payload);
        },
        updateSelectedEmail(context,payload){
            context.commit('updateSelectedEmail',payload);
        }
    },
    getters:{
        getGuestNowWeddingMessage(state){
            return state.guestNowWeddingMessage;
        },
        getSelectedEmail(state){
            return state.selectedEmail;
        }
    }
}