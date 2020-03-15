<template>
  <div class="saved-groups-list">
    <div class="saved-group"
         :key="group.id" v-for="group in savedDeviceGroups">
      <div class="saved-group-title">
        <div>
          {{group.name}}
        </div>
        <div>
          <i class="fas fa-pencil-alt button-edit-name"
             @click="showRenameGroup(group.id)"></i>
          <i class="fas fa-trash-alt button-remove"
             @click="deleteGroup(group.id)"></i>
        </div>
      </div>
      <div>
        <div :key="device.id" v-for="device in group.devices">
          {{device.host}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "SavedGroupsList",
    computed: {
      ...mapState(["savedDeviceGroups"])
    },
    methods: {
      showSearch() {
        this.$store.commit("showSearch");
      },
      isSelected(id) {
        return this.selectedGroup && this.selectedGroup.id === id;
      },
      selectGroup(ip) {
        this.$store.commit("selectGroup", ip);
      },
      deleteGroup(id) {
        this.$store.commit("deleteDeviceGroup", id);
      },
      showRenameGroup(id) {
        this.$store.commit("showRenameGroup", id);
      }
    }
  }
</script>

<style scoped>
  .saved-groups-list {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .saved-group:hover {
    background: #656567;
  }

  .saved-group-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
</style>
