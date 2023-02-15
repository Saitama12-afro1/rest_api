import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    host: "",
    valueMap: "",
    valueApr: "",
    text: "",
    role: "",
  },
  getters: {
    host: (state) => {
      return state.host;
    },
    value: (state) => {
      return state.valueMap;
    },
    valueApr: (state) => {
      return state.valueApr;
    },
    text: (state) => {
      return state.text;
    },
    role: (state) => {
      return state.role;
    },
  },
  mutations: {
    host: (state, payload) => {
      state.host = payload;
    },
    setValueMap: (state, payload) => {
      state.valueMap = payload;
    },
    setValueApr: (state, payload) => {
      state.valueApr = payload;
    },
    setText: (state, payload) => {
      state.text = payload;
    },
    setRole: (state, payload) => {
      state.role = payload;
    },
  },
  actions: {
    host: (state) => () => {
      return state.host;
    },
  },
});
