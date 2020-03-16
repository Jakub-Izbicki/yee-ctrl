<template>
  <div class="flex-grow-0 w-1/3 flex flex-col items-center bg-darker">
    <i @click="toggleSearch" class="fas fa-search text-3xl text-secondary"></i>

    <div class="saved-groups-list h-full w-full overflow-auto bg-darker">
      <div class="saved-group hover:bg-highlight"
           :key="group.id" v-for="group in savedDeviceGroups">
        <div class="saved-group-title flex justify-between">
          <div class="font-medium text-xl">
            {{group.name}}
          </div>
          <div>
            <i class="fas fa-pencil-alt button-edit-name text-xl"
               @click="showRenameGroup(group.id)"></i>
            <i class="fas fa-trash-alt text-xl"
               @click="deleteGroup(group.id)"></i>
          </div>
        </div>
        <div class="flex flex-row justify-between">
          <div class="text-secondary">{{devicesAmount(group.id)}}</div>
          <i class="fas fa-chevron-down"></i>
        </div>
        <div>
          <div class="text-secondary"
               :key="device.id" v-for="device in group.devices">
            {{device.host}}
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "SavedGroups",
    computed: {
      ...mapState(["savedDeviceGroups"])
    },
    methods: {
      toggleSearch() {
        this.$store.commit("toggleSearch");
      },
      deleteGroup(id) {
        this.$store.commit("deleteDeviceGroup", id);
      },
      showRenameGroup(id) {
        this.$store.commit("showRenameGroup", id);
      },
      devicesAmount(groupId) {
        const amount = this.savedDeviceGroups.find(savedGroup => {
          return savedGroup.id === groupId;
        }).devices.length;

        return amount === 1 ? `${amount} device` : `${amount} devices`;
      }
    }
  }
</script>
