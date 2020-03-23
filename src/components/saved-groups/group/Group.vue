<template>
  <div class="group hover:bg-highlight rounded p-1"
       :class="{'bg-accent hover:bg-accent': isSelected()}"
       @click="selectGroup">
    <div v-if="!showRename"
         class="title flex justify-between">
      <div class="font-medium text-lg m-1 overflow-hidden">
        {{group.name}}
      </div>
      <div class="flex">
        <i class="button-edit-name invisible group-hover:visible fas fa-pencil-alt
        transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
        transform active:scale-90 cursor-pointer rounded-full text-lg text-secondary
        hover:text-focus p-2"
           @click="showRenameGroup"></i>
        <i class="button-delete-group invisible group-hover:visible fas fa-trash-alt
        transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
        transform active:scale-90 cursor-pointer rounded-full text-lg text-secondary
        hover:text-warn p-2"
           @click="deleteGroup"></i>
      </div>
    </div>
    <form v-if="showRename"
          v-on-clickaway="hideRenameGroup"
          class="flex flex-row justify-between">
      <input v-model="renameValue"
             ref="renameInput"
             class="font-medium w-2/3 text-darker text-lg m-1 pl-1 overflow-hidden rounded">
      <div class="w-1/3 flex">
        <input type="submit" class="hidden" @click="renameGroup">
        <i class="button-confirm-rename invisible group-hover:visible fas fa-check
        transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
        transform active:scale-90 cursor-pointer rounded-full text-lg text-secondary
        hover:text-focus p-2"
           @click="renameGroup"></i>
        <i class="button-exit-rename invisible group-hover:visible fas fa-times
        transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
        transform active:scale-90 cursor-pointer rounded-full text-lg text-secondary
        hover:text-warn p-2"
           @click="hideRenameGroup"></i>
      </div>
    </form>
    <div class="flex flex-row justify-center">
      <div class="text-secondary px-2">{{devicesAmount(group.id)}}</div>
      <i class="button-delete-group invisible group-hover:visible
        transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
        transform active:scale-90 cursor-pointer rounded-full text-lg text-secondary
        hover:text-focus p-1"
         :class="[{'fas fa-chevron-down': !this.showDevices},
         {'fas fa-chevron-up': this.showDevices}]"
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
  import {mixin as clickaway} from 'vue-clickaway';

  export default {
    name: "Group",
    props: ["group"],
    mixins: [clickaway],
    data() {
      return {
        showDevices: false,
        showRename: false,
        renameValue: ""
      }
    },
    computed: {
      ...mapState(["savedDeviceGroups", "selectedGroupId"])
    },
    methods: {
      deleteGroup() {
        this.$store.commit("deleteDeviceGroup", this.group.id);
      },
      showRenameGroup() {
        this.renameValue = this.group.name;
        this.showRename = true;

        this.$nextTick().then(() => {
          this.$refs.renameInput.focus();
        });
      },
      hideRenameGroup() {
        this.showRename = false;
      },
      renameGroup() {
        this.$store.commit("renameGroup", {
          id: this.group.id, newName: this.renameValue
        });
        this.hideRenameGroup();
      },
      devicesAmount(groupId) {
        const amount = this.savedDeviceGroups.find(savedGroup => {
          return savedGroup.id === groupId;
        }).devices.length;

        return amount === 1 ? `${amount} device` : `${amount} devices`;
      },
      toggleExpandDevices() {
        this.showDevices = !this.showDevices;
      },
      isSelected() {
        return this.selectedGroupId === this.group.id;
      },
      selectGroup() {
        this.$store.commit("selectGroup", this.group.id);
      }
    }
  }
</script>

<style scoped>

</style>
