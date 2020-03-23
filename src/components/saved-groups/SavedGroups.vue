<template>
  <div class="flex-grow-0 w-1/3 h-full p-3 bg-darker rounded-l flex flex-col items-center">
    <IconButton :custom-class="'fas fa-search text-3xl text-secondary hover:text-focus p-5'"
                :click="showSearchWindow"></IconButton>
    <div class="list w-full mt-2 overflow-auto">
      <Group :key="group.id" v-for="group in savedDeviceGroups"
             :group="group">
      </Group>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Group from "./group/Group";
  import IconButton from "../icon-button/IconButton";

  export default {
    name: "SavedGroups",
    components: {IconButton, Group},
    computed: {
      ...mapState(["savedDeviceGroups", "showSearch"])
    },
    methods: {
      showSearchWindow() {
        this.$store.commit("showSearch");
      }
    }
  }
</script>
