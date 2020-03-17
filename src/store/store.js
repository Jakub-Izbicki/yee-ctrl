import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    strict: true,
    name: "Yee-Ctrl",
    foundDevices: [],
    savedDeviceGroups: [],
    toAddGroups: [],
    showSearch: false,
  },
  mutations: {
    toggleSearch(state) {
      state.showSearch = !state.showSearch;
    },
    addFoundDevice(state, newDevice) {
      if (state.foundDevices
      .find(device => device.ip === newDevice.ip) === undefined) {
        state.foundDevices.push(newDevice);
      }
    },
    saveNewDeviceGroup(state, newGroup) {
      state.savedDeviceGroups.push(newGroup);
    },
    deleteDeviceGroup(state, id) {
      state.savedDeviceGroups = state.savedDeviceGroups.filter(group => {
        return group.id !== id;
      });
    },
    renameGroup(state, data) {
      state.savedDeviceGroups = state.savedDeviceGroups.map(savedDevice => {
        return savedDevice.id === data.id
            ? {...savedDevice, name: data.newName}
            : savedDevice;
      })
    }
  }
})
