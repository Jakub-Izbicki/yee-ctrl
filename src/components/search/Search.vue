<template>
  <div v-if="showSearch" class="search h-full w-0 flex-grow bg-dark">
    <div class="header flex">
      <div>Search</div>
      <button @click="hideSearch">&times;</button>
    </div>
    <button @click="searchForDevices">Refresh</button>
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
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Discovery from "./discovery";
  import {v4 as uuid} from "uuid"

  export default {
    name: "Search",
    data() {
      return {
        discoveryService: undefined,
        selectedFoundDevices: []
      };
    },
    computed: {
      ...mapState(["showSearch", "foundDevices", "savedDeviceGroups"])
    },
    methods: {
      hideSearch() {
        this.$store.commit("hideSearch");
      },
      searchForDevices() {
        if (this.discoveryService !== undefined) {
          this.discoveryService.close();
        }

        this.discoveryService = new Discovery();

        this.discoveryService.on("onDeviceDiscovered", (device) => {
          this.$store.commit("addFoundDevice", device);
        });

        this.discoveryService.search();
      },
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
