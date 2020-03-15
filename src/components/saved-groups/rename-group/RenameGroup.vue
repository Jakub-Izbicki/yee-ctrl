<template>
  <div v-if="showRenameGroup" :key="showRenameGroup">
    <div class="mask">
      <div class="window">
        <div class="header">
          <div class="m-4">Rename group?</div>
          <button @click="hideRenameGroup">&times;</button>
        </div>
        <input v-model="newName"/>
        <button @click="rename">Rename</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: "RenameGroup",
    computed: {
      ...mapState(["showRenameGroup", "groupIdToRename", "groupNameToRename", "savedDeviceGroups"]),
      newName: {
        get() {
          return this.groupNameToRename;
        },
        set(newName) {
          return newName;
        }
      }
    },
    methods: {
      hideRenameGroup() {
        this.$store.commit("hideRenameGroup");
      },
      rename() {
        this.$store.commit("renameGroup", {
          id: this.groupIdToRename,
          newName: this.newName
        });
        this.hideRenameGroup();
      }
    }
  }
</script>

<style scoped>
  .mask {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1;

    display: flex;
    flex-direction: column;

    background: rgba(28, 28, 28, 0.77);
  }

  .window {
    width: 50%;
    height: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;

    display: flex;
    flex-direction: column;

    background: rgb(82, 80, 87);
  }

  .header {
    display: flex;
    flex-direction: row;
  }
</style>
