// import calculateUnRead from '../../../hooks/firebase/chat/calculateUnRead.js';
export default {
    namespaced:true,
    state(){
        return {
            guestNowWeddingMessage:[], //在進入婚禮後切換
            hostWeddingList:[],
            selectedEmail: localStorage['selectedWeddingEmail']||'',
            isRead:[],
            whoSendMessage:[],
            totalUnread:0
        }
    },
    mutations:{
        changeGuestMessage(state,payload){
            state.guestNowWeddingMessage = payload;
        },
        updateSelectedEmail(state,payload){
            state.selectedEmail = payload
        },
        updateHostWeddingList(state,payload){
            state.hostWeddingList = payload
        },
        updateIsRead(state,payload){
            state.isRead = payload;
        },
        updateNewSender(state,payload){
            state.whoSendMessage = payload;
        },
        updateItem(state,payload){
            state[payload.name] = payload.value
        },
        resetAll(state){
            state.guestNowWeddingMessage=[];
            state.hostWeddingList=[];
            state.selectedEmail='';
            state.isRead=[];
            state.whoSendMessage=[];
            state.totalUnread=0;
        }
    },
    actions:{
        changeGuestMessage(context,payload){
            context.commit("changeGuestMessage",payload);
        },
        updateSelectedEmail(context,payload){
            context.commit('updateSelectedEmail',payload);
        },
        updateHostWeddingList(context,payload){
            context.commit('updateHostWeddingList',payload);
        },
        updateIsRead(context,payload){
            context.commit('updateIsRead',payload);
        },
        updateNewSender(context,payload){
            context.commit('updateNewSender',payload);
        },
        updateItem(context,payload){
            context.commit('updateItem',payload);
        },
        resetAll(context){
            context.commit('resetAll');
        }
    },
    getters:{
        getGuestNowWeddingMessage(state){
            return state.guestNowWeddingMessage;
        },
        getSelectedEmail(state){
            return state.selectedEmail;
        },
        getHostWeddingList(state){
            return state.hostWeddingList;
        },
        getIsRead(state){
            return state.isRead;
        },
        getSender(state){
            return state.whoSendMessage;
        },
        getItemAll(state){
            return state;
        }
    }
}