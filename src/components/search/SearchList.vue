<template>
  <div class="search-list-wrapper">
    <div class="search-list">
      <div class="search-list-item"
           :class="{'search-list-item-selected': isDeviceSelected(device.id)}"
           :key="device.id" v-for="device in this.foundDevices"
           @click="toggleSelect(device.id)">
        {{device.host}}
      </div>
    </div>
    <div class="add-button-wrapper">
      <button @click="saveNewGroup">Save selected</button>
    </div>
    <div class="saved-groups-list-wrapper">
      <SavedGroupsList></SavedGroupsList>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import {v4 as uuid} from "uuid"
  import SavedGroupsList from "../saved-groups/SavedGroupsList";

  export default {
    name: "SearchList",
    components: {SavedGroupsList},
    data() {
      return {
        selectedFoundDevices: []
      }
    },
    computed: {
      ...mapState(["foundDevices", "savedDeviceGroups"]),

    },
    methods: {
      isDeviceSelected(id) {
        return this.selectedFoundDevices.some(deviceId => {
          return deviceId === id
        });
      },
      toggleSelect(id) {
        if (this.isDeviceSelected(id)) {
          this.selectedFoundDevices = this.selectedFoundDevices.filter(deviceId => deviceId !== id);
        } else {
          this.selectedFoundDevices.push(id);
        }
      },
      saveNewGroup() {
        if (this.selectedFoundDevices.length === 0) {
          return;
        }

        const newGroupDevices = this.foundDevices.filter(device => {
          return this.selectedFoundDevices.some(selectedDeviceId => {
            return selectedDeviceId === device.id;
          })
        });
        this.selectedFoundDevices = [];

        this.$store.commit("saveNewDeviceGroup", {
          id: uuid(),
          name: this.generateNewGroupName(),
          devices: newGroupDevices
        });
      },
      generateNewGroupName() {
        let isUniqueName = false;
        let groupNumber = 0;
        while (!isUniqueName) {
          groupNumber++;
          const name = `MyGroup ${groupNumber}`;
          const isNameTaken = this.savedDeviceGroups.some(group => {
            return group.name === name;
          });

          if (!isNameTaken) {
            return name;
          }
        }
      }
    }
  }
</script>

<style scoped>
  .search-list-wrapper {
    flex-grow: 10;
    flex-basis: 0;

    display: flex;
    flex-direction: row;
    overflow: hidden;
  }

  .search-list {
    flex-grow: 3;
    flex-basis: 0;

    display: flex;
    flex-direction: column;
  }

  .search-list-item {
    width: 100%;
    cursor: pointer;
  }

  .search-list-item-selected {
    background: #f4c894;
  }

  .add-button-wrapper {
    flex-grow: 1;
    flex-basis: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .saved-groups-list-wrapper {
    height: 100%;

    flex-grow: 3;
    flex-basis: 0;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>
