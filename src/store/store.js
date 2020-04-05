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
    selectedGroup: null,
    showState: "SAVED_GROUPS",
    showGroupsListState: "SAVED_GROUPS",
    showSearchState: "SEARCH",
    showGroupSettingsState: "GROUP_SETTINGS"
  },
  getters: {
    savedDeviceGroups(state) {
      if (state.savedDeviceGroups.length === 0) {
        return [];
      }

      return state.savedDeviceGroups.sort((first, second) => {
        return first.name.localeCompare(second.name);
      })
    }
  },
  mutations: {
    showSearch(state) {
      state.selectedGroup = null;
      state.showState = state.showSearchState;
    },
    addFoundDevice(state, newDevice) {
      if (state.foundDevices
      .find(device => device.ip === newDevice.ip) === undefined) {
        state.foundDevices.push(newDevice);
      }
    },
    removeFoundDevices(state) {
      state.foundDevices = [];
    },
    saveNewDeviceGroup(state, newGroup) {
      state.savedDeviceGroups.push(newGroup);
    },
    deleteDeviceGroup(state, id) {
      state.savedDeviceGroups = state.savedDeviceGroups.filter(group => {
        return group.id !== id;
      });
      if (state.showState === state.showGroupSettingsState) {
        state.selectedGroup = null;
        state.showState = state.showGroupsListState;
      }
    },
    renameGroup(state, data) {
      state.savedDeviceGroups = state.savedDeviceGroups.map(savedDevice => {
        return savedDevice.id === data.id
            ? {...savedDevice, name: data.newName}
            : savedDevice;
      })
    },
    selectGroup(state, group) {
      state.showState = state.showGroupSettingsState;
      state.selectedGroup = group;
    },
    deselectGroup(state) {
      state.selectedGroup = null;
      state.showState = state.showGroupsListState;
    },
  }
})
