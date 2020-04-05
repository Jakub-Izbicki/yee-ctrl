<template>
  <div class="flex-grow-0 w-full h-full p-3 bg-backgroundSecondary rounded-lg flex flex-col items-center overflow-hidden">
    <div class="list flex-grow-1 w-full mt-2 overflow-auto"
         :class="[{'h-full': showState === showGroupsListState || showState === showGroupSettingsState},
         {'h-1/2': showState === showSearchState}]">
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
                :custom-class="'fas fa-plus text-2xl text-secondary hover:text-focus p-3'"
                :click="showSearchWindow"></IconButton>
    <transition name="search">
      <div v-if="showState === showSearchState"
           class="h-1/2 w-full">
        <Search></Search>
      </div>
    </transition>
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
        "showSearchState", "showGroupSettingsState"])
    },
    methods: {
      showSearchWindow() {
        this.$store.commit("showSearch");
      }
    }
  }
</script>

<style scoped>
  .search-enter, .search-leave-to {
    opacity: 0;
    transform: translateY(100px);
  }

  .search-enter-active, .search-leave-active {
    transition: all .1s;
  }
</style>
