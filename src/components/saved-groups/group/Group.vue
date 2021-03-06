<template>
  <div class="rounded-lg p-1"
       :class="[{'hover:bg-highlight cursor-pointer': !isSelected},
       {'bg-backgroundSecondary hover:bg-backgroundSecondary': isSelected},
       {'h-full': isSelected}]"
       @click="selectGroup">
    <div v-if="isSelected">
      <i @click.stop="deselectGroup"
         class="button-deselect-group flex flex-col justify-center items-center align-center w-full
        transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
        transform active:scale-90 cursor-pointer rounded-full text-lg text-secondary
        hover:text-focus p-1 fas fa-chevron-left"></i>
    </div>
    <div class="group">
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
             @click.stop="showRenameGroup"></i>
          <i class="button-delete-group invisible group-hover:visible fas fa-trash-alt
        transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
        transform active:scale-90 cursor-pointer rounded-full text-lg text-secondary
        hover:text-warn p-2"
             @click.stop="deleteGroup"></i>
        </div>
      </div>
      <form v-if="showRename"
            v-on-clickaway="hideRenameGroup"
            class="flex justify-between">
        <input v-model="renameValue"
               ref="renameInput"
               class="font-medium w-2/3 text-primary text-lg m-1 pl-1 overflow-hidden rounded-full">
        <div class="flex">
          <input type="submit" class="hidden" @click.stop="renameGroup">
          <i class="button-confirm-rename fas fa-check
        transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
        transform active:scale-90 cursor-pointer rounded-full text-lg text-secondary
        hover:text-focus p-2"
             @click.stop="renameGroup"></i>
          <i class="button-exit-rename fas fa-times
        transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
        transform active:scale-90 cursor-pointer rounded-full text-lg text-secondary
        hover:text-warn p-2"
             @click.stop="hideRenameGroup"></i>
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
           @click.stop="toggleExpandDevices"></i>
      </div>
      <div v-if="showDevices" class="flex flex-col items-center">
        <div class="text-secondary"
             :key="device.id" v-for="device in group.devices">
          <Device :device="device"></Device>
        </div>
      </div>
    </div>
    <div v-if="isSelected"
         class="mt-3">
      <SelectedGroupSettings></SelectedGroupSettings>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {mixin as clickaway} from 'vue-clickaway';
  import SelectedGroupSettings from "../../selected-group-settings/SelectedGroupSettings";
  import Device from "../device/Device";

  export default {
    name: "Group",
    components: {Device, SelectedGroupSettings},
    props: ["groupId"],
    mixins: [clickaway],
    data() {
      return {
        showDevices: false,
        showRename: false,
        renameValue: ""
      }
    },
    computed: {
      ...mapState(["savedDeviceGroups", "selectedGroup", "showState", "showGroupSettingsState"]),
      group() {
        return this.savedDeviceGroups.find((group) => {
          return group.id === this.groupId;
        })
      },
      isSelected() {
        return this.selectedGroup != null && this.selectedGroup.id === this.group.id;
      }
    },
    methods: {
      deleteGroup() {
        const name = this.group.name;
        this.$store.commit("deleteDeviceGroup", this.group.id);
        this.$store.dispatch('toast/createToast', {
          text: `'${name}' removed`,
          time: 2000,
        })
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
      selectGroup() {
        this.$store.commit("selectGroup", this.group);
      },
      deselectGroup() {
        this.$store.commit("deselectGroup");
      }
    }
  }
</script>

<style scoped>
</style>
