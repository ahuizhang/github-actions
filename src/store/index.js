import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userInfo: null,
  },
  mutations: {
    saveUserInfoToken(state, data) {
      state.token = data.token;
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
    },
  },
  actions: {
    saveUserInfoToken(ctx, data) {
      ctx.commit("saveUserInfoToken", data);
    },
  },
  modules: {},
});
