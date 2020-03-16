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
    showRenameGroup: false,
    groupIdToRename: "",
    groupNameToRename: ""
  },
  mutations: {
    toggleSearch(state) {
      state.showSearch = !state.showSearch;
    },
    addFoundDevice(state, newDevice) {
      if (state.foundDevices
      .find(device => device.ip === newDevice.ip) === undefined) {
        console.log("Adding new device");
        console.log(newDevice);
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
    showRenameGroup(state, id) {
      state.groupIdToRename = id;
      state.groupNameToRename = state.savedDeviceGroups.find(savedGroup => {
        return savedGroup.id === state.groupIdToRename;
      }).name;
      state.showRenameGroup = true;
    },
    hideRenameGroup(state) {
      state.showRenameGroup = false;
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
