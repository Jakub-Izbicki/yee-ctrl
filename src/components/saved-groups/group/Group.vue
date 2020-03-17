<template>
  <div class="group hover:bg-highlight">
    <div v-if="!showRename"
         class="title flex justify-between">
      <div class="font-medium text-lg">
        {{group.name}}
      </div>
      <div>
        <i class="button-edit-name invisible group-hover:visible fas fa-pencil-alt text-xl text-secondary"
           @click="toggleRenameGroup"></i>
        <i class="button-delete-group invisible group-hover:visible fas fa-trash-alt text-xl text-secondary"
           @click="deleteGroup(group.id)"></i>
      </div>
    </div>
    <div v-if="showRename"
         class="flex justify-between">
      <input v-model="renameValue">
      <div>
        <i class="button-confirm-rename fas fa-check text-xl text-secondary"
           @click="renameGroup"></i>
        <i class="button-exit.rename fas fa-times text-xl text-secondary"
           @click="toggleRenameGroup"></i>
      </div>
    </div>
    <div class="flex flex-row justify-center">
      <div class="text-secondary">{{devicesAmount(group.id)}}</div>
      <i v-if="!showDevices"
         class="button-toggle-expand-devices invisible group-hover:visible text-secondary fas
         fa-chevron-down"
         @click="toggleExpandDevices"></i>
      <i v-if="showDevices"
         class="button-toggle-expand-devices invisible group-hover:visible text-secondary fas
         fa-chevron-up"
         @click="toggleExpandDevices"></i>
    </div>
    <div v-if="showDevices" class="flex flex-col items-center">
      <div class="text-secondary"
           :key="device.id" v-for="device in group.devices">
        {{device.host}}
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "Group",
    props: ["group"],
    data() {
      return {
        showDevices: false,
        showRename: false,
        renameValue: ""
      }
    },
    computed: {
      ...mapState(["savedDeviceGroups"])
    },
    methods: {
      deleteGroup(id) {
        this.$store.commit("deleteDeviceGroup", id);
      },
      toggleRenameGroup() {
        this.renameValue = this.group.name;
        this.showRename = !this.showRename;
      },
      renameGroup() {
        this.$store.commit("renameGroup", {
          id: this.group.id, newName: this.renameValue
        });
        this.toggleRenameGroup();
      },
      devicesAmount(groupId) {
        const amount = this.savedDeviceGroups.find(savedGroup => {
          return savedGroup.id === groupId;
        }).devices.length;

        return amount === 1 ? `${amount} device` : `${amount} devices`;
      },
      toggleExpandDevices() {
        this.showDevices = !this.showDevices;
      }
    }
  }
</script>

<style scoped>

</style>
