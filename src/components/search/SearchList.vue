<template>
  <div class="wrapper flex">
    <div class="search-list flex-grow flex flex-col">
      <div class="item w-full cursor-pointer"
           :class="{'item-selected': isDeviceSelected(device.id)}"
           :key="device.id" v-for="device in this.foundDevices"
           @click="toggleSelect(device.id)">
        {{device.host}}
      </div>
    </div>
    <button @click="saveNewGroup">Save selected</button>
    <SavedGroupsList></SavedGroupsList>
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
  .item-selected {
    background: #f4c894;
  }
</style>
