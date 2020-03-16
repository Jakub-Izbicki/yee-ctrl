<template>
  <div v-if="showRenameGroup" :key="groupNameToRename">
    <div class="mask fixed h-full w-full flex items-center justify-center bg-darkest">
      <div class="modal fixed flex flex-col bg-dark">
        <div class="header m-4 flex flex-row justify-between">
          <div>Rename group</div>
          <button @click="hideRenameGroup">&times;</button>
        </div>
        <div class="m-4">Please provide new name for group {{groupNameToRename}}</div>
        <input class="m-4 bg-black"
               v-model="newName"/>
        <button class="m-4"
                @click="rename">Rename
        </button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "RenameGroup",
    data() {
      return {
        newName: ""
      }
    },
    computed: {
      ...mapState(["showRenameGroup", "groupIdToRename", "groupNameToRename", "savedDeviceGroups"]),
    },
    methods: {
      hideRenameGroup() {
        this.newName = "";
        this.$store.commit("hideRenameGroup");
      },
      rename() {
        this.$store.commit("renameGroup", {
          id: this.groupIdToRename,
          newName: this.newName
        });
        this.newName = "";
        this.hideRenameGroup();
      }
    }
  }
</script>
