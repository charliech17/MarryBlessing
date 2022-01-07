export default {
    namespaced: true,
    state(){
        return {
            isMenuOpen: false
        };
    },
    mutations:{
        toggleMenuOpen(state,boolen){
            state.isMenuOpen = boolen;
        }
    },
    actions:{
        toggleMenuOpen(context,boolen){
            context.commit('toggleMenuOpen',boolen);
        }
    },
    getters:{
        getIsMenuOpen(state){
            return state.isMenuOpen;
        }
    }
}