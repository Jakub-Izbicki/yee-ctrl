import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    strict: true,
    name: "Yee-Ctrl",
    savedBulbGroups: [
      {
        ip: "123.123",
        name: "My Bulb 1"
      },
      {
        ip: "124.124",
        name: "My Bulb 2"
      },
      {
        ip: "125.125",
        name: "My Bulb 3"
      },
    ]
  },
  getters: {},
  mutations: {}
})
