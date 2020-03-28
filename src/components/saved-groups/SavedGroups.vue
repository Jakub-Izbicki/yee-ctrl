<template>
  <div class="flex-grow-0 w-full h-full p-3 bg-darker rounded-l flex flex-col items-center">
    <div class="list h-full w-full mt-2 overflow-auto">
      <div v-if="savedDeviceGroups.length === 0"
           class="h-full w-full flex flex-col justify-center items-center">
        <div>There are no saved device groups,</div>
        <div>click '+' to search for new devices.</div>
      </div>
      <Group :key="group.id" v-for="group in savedDeviceGroups"
             :group="group">
      </Group>
    </div>
    <IconButton v-if="showState === showGroupsListState"
                :custom-class="'fas fa-plus text-3xl text-secondary hover:text-focus m-3 p-1'"
                :click="showSearchWindow"></IconButton>
    <div v-if="showState === showSearchState"
         class="flex-grow-1 w-full">
      <Search></Search>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Group from "./group/Group";
  import IconButton from "../icon-button/IconButton";
  import Search from "../search/Search";

  export default {
    name: "SavedGroups",
    components: {Search, IconButton, Group},
    computed: {
      ...mapState(["savedDeviceGroups", "selectedGroupId", "showState", "showGroupsListState",
        "showSearchState"])
    },
    methods: {
      showSearchWindow() {
        this.$store.commit("showSearch");
      }
    }
  }
</script>
