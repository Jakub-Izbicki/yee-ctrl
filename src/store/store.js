import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    strict: true,
    name: "Yee-Ctrl",
    selectedGroupId: "",
    savedBulbGroups: [
      {
        id: "1",
        ips: ["123.123", "222.333.abc", "748.992.099"],
        name: "My Bulb 1"
      },
      {
        id: "2",
        ips: ["124.124"],
        name: "My Bulb 2"
      },
      {
        id: "3",
        ips: ["125.125", "009.sui.kkj"],
        name: "My Bulb 3"
      },
    ],
    foundDevices: [],
    toAddGroups: [],
    showSearch: false
  },
  getters: {
    selectedGroup(state) {
      return state.savedBulbGroups.find(
          group => group.id === state.selectedGroupId);
    }
  },
  mutations: {
    selectGroup(state, id) {
      state.selectedGroupId = id;
    },
    showSearch(state) {
      state.showSearch = true;
    },
    hideSearch(state) {
      state.showSearch = false;
    },
    addFoundDevice(state, newDevice) {
      if (state.foundDevices.find(device => device.ip === newDevice.ip)
          === undefined) {
        console.log("Adding new device");
        console.log(newDevice);
        state.foundDevices.push(newDevice);

        console.log(state.foundDevices);
      }
    }
  }
})
