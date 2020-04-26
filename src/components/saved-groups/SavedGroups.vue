<template>
  <div class="w-full h-full m-2 bg-backgroundSecondary rounded-lg overflow-hidden">
    <transition name="selecting-group" mode="out-in">
      <div v-if="selectedGroup == null"
           key="savedGroups"
           class="flex-grow-0 w-full h-full p-3 flex flex-col items-center overflow-hidden">
        <div class="list flex-grow-1 w-full mt-2 overflow-auto"
             :class="[{'h-full': showState === showGroupsListState || showState === showGroupSettingsState},
         {'h-1/2': showState === showSearchState}]">
          <div v-if="savedDeviceGroups.length === 0"
               class="h-full w-full flex flex-col justify-center items-center">
            <div>There are no saved device groups,</div>
            <div>click '+' to search for new devices.</div>
          </div>
          <transition-group name="groups">
            <Group :key="group.id"
                   v-for="group in savedDeviceGroups"
                   :groupId="group.id">
            </Group>
          </transition-group>
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
    </transition>
    <transition name="group-settings">
      <div v-if="selectedGroup != null"
           key="selectedGroup"
           class="flex-grow-0 w-full h-full p-3 flex flex-col items-center overflow-hidden">
        <Group :groupId="selectedGroup.id"></Group>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {mapGetters} from 'vuex'
  import Group from "./group/Group";
  import IconButton from "../icon-button/IconButton";
  import Search from "../search/Search";

  export default {
    name: "SavedGroups",
    components: {Search, IconButton, Group},
    computed: {
      ...mapState(["selectedGroup", "showState", "showGroupsListState",
        "showSearchState", "showGroupSettingsState"]),
      ...mapGetters(["savedDeviceGroups"])
    },
    methods: {
      showSearchWindow() {
        this.$store.commit("showSearch");
      }
    }
  }
</script>

<style scoped>
  .selecting-group-enter, .selecting-group-leave-to {
    opacity: 0;
    transform: translateX(-300px);
  }

  .selecting-group-enter-active, .selecting-group-leave-active {
    transition: all 0.1s;
  }

  .group-settings-enter, .group-settings-leave-to {
    transform: translateX(300px);
  }

  .group-settings-enter-active {
    animation: group-settingss 0.2s;
  }

  .group-settings-leave-active {
    animation: group-settingss 0.2s reverse;
  }

  @keyframes group-settingss {
    0% {
      transform: translateX(300px);
    }
    50% {
      transform: translateX(300px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  .groups-move {
    transition: transform 0.2s;
  }

  .groups-enter, .groups-leave-to {
    opacity: 0;
    background: rgb(186, 176, 163);
    transform: translateX(-200px);
  }

  .groups-enter-active {
    transition: transform 0.2s, background-color 2s, opacity 0.2s;
  }

  .groups-leave-active {
    transition: transform 0.2s, background-color 2s, opacity 0.2s;
    position: absolute;
  }

  .search-enter, .search-leave-to {
    opacity: 0;
    transform: translateY(100px);

  }

  .search-enter-active, .search-leave-active {
    transition: all .1s;
  }
</style>
