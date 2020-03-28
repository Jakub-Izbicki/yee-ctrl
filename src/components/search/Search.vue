<template>
  <div v-if="showSearch"
       class="search h-full w-full p-3 rounded-lg flex-grow flex flex-col items-center bg-dark">
    <div class=" m-5 text-xl">
      Search for devices
    </div>
    <div :class="{'searching': isSearching}">
      <IconButton :custom-class="'fas fa-sync-alt text-3xl text-secondary hover:text-focus p-5'"
                  :click="searchForDevices"></IconButton>
    </div>
    <div class="search-list flex-grow flex flex-col overflow-auto m-4">
      <div class="item active:bg-selected p-3 m-1 rounded cursor-pointer"
           :class="[{'bg-selected': isDeviceSelected(device.id)},
           {'hover:bg-highlight': !isDeviceSelected(device.id)}]"
           :key="device.id" v-for="device in this.foundDevices"
           @click="toggleSelect(device.id)">
        {{device.host}}
      </div>
    </div>
    <IconButton :custom-class="'far fa-save text-3xl text-secondary hover:text-focus p-5'"
                :class="{invisible: selectedFoundDevices.length === 0}"
                :click="saveNewGroup">
    </IconButton>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import Discovery from "./discovery";
  import {v4 as uuid} from "uuid"
  import IconButton from "../icon-button/IconButton";

  export default {
    name: "Search",
    components: {IconButton},
    data() {
      return {
        isSearching: false,
        discoveryService: undefined,
        selectedFoundDevices: []
      };
    },
    mounted() {
      this.searchForDevices();
    },
    computed: {
      ...mapState(["foundDevices", "savedDeviceGroups", "showState", "showSearchState"]),
      showSearch() {
        return this.showState === this.showSearchState;
      }
    },
    methods: {
      searchForDevices() {
        this.$store.commit("removeFoundDevices");

        if (this.discoveryService !== undefined) {
          this.isSearching = false;
          this.discoveryService.close();
        }

        this.discoveryService = new Discovery();

        this.discoveryService.on("onDeviceDiscovered", (device) => {
          this.$store.commit("addFoundDevice", device);
        });
        this.discoveryService.on("endOfSearch", () => {
          this.isSearching = false;
        });

        this.isSearching = true;
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
          const name = `New Group ${groupNumber}`;
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

  .searching {
    pointer-events: none;
    animation: spin 0.5s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
