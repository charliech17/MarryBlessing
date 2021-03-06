export default {
  namespaced: true,
  state() {
    return {
      controlColors: {
        nowColorBarPage:0,
        colorPage: 0,
        colorIndex: 1, //一開始是黑色
        colorMode: -1,
        lastSelectedIndex: 1,
      },
    };
  },
  mutations: {
    changeColorPage(state, change) {
      state.controlColors["colorPage"] += change;
    },
    changeColorBarPage(state, change) {
      state.controlColors["nowColorBarPage"] += change;
    },
    updateColorPage(state,page){
      state.controlColors["colorPage"] = page;
    },
    changeColorIndex(state, newIndex) {
      state.controlColors["colorIndex"] = newIndex;
    },
    changeColorMode(state) {
      if (state.controlColors["colorMode"] === -1) {
        state.controlColors["colorMode"] = 1;
        return;
      }

      state.controlColors["colorMode"] += 1;

      if (state.controlColors["colorMode"] > 2) {
        state.controlColors["colorMode"] = 0;
        return;
      }
    },
    updateSelectedIndex(state, newIndex) {
      state.controlColors["lastSelectedIndex"] = newIndex;
    },
    resetAll(state) {
      // state.controlColors['colorPage'] = 0;
      // state.controlColors['colorIndex'] = 1;
      // state.controlColors['colorMode'] = -1;
      state.controlColors = {
        nowColorBarPage:0,
        colorPage: 0,
        colorIndex: 1, //一開始是黑色
        colorMode: -1,
        lastSelectedIndex: 1,
      };
      // console.log(state.controlColors);
    },
    getEdited(state, controlColors) {
      // console.log(controlColors);
      state.controlColors["colorPage"] = controlColors["colorPage"];
      state.controlColors["nowColorBarPage"] = controlColors["colorPage"]; //use colorPage
      state.controlColors["colorIndex"] = controlColors["colorIndex"];
      state.controlColors["colorMode"] = controlColors["colorMode"];
      state.controlColors["lastSelectedIndex"] = controlColors["lastSelectedIndex"];
    },
  },
  actions: {
    // changeControlColors(context,changeParameters){
    //     context.commit('changeControlColors',changeParameters);
    // },
    changeColorPage(context, change) {
      context.commit("changeColorPage", change);
    },
    changeColorBarPage(context, change) {
      context.commit("changeColorBarPage", change);
    },
    updateColorPage(context,page){
      context.commit("updateColorPage", page);
    },
    changeColorMode(context) {
      context.commit("changeColorMode");
    },
    changeColorIndex(context, newIndex) {
      context.commit("changeColorIndex", newIndex);
    },
    updateSelectedIndex(context, newIndex) {
      context.commit("updateSelectedIndex", newIndex);
    },
    resetAll(context) {
      context.commit("resetAll");
    },
    getEdited(context, controlColors) {
      context.commit("getEdited", controlColors);
    },
  },
  getters: {
    controlColors(state) {
      return state.controlColors;
    },
  },
};
