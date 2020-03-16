<template>
  <div class="flex-grow-0 w-1/3 flex flex-col items-center bg-darker">
    <i v-if="!showSearch"
        @click="toggleSearch"
       class="fas fa-search text-3xl text-secondary"></i>
    <i v-if="showSearch"
        @click="toggleSearch"
       class="fas fa-sliders-h text-3xl text-secondary"></i>
    <div class="list w-full overflow-auto">
      <Group :key="group.id" v-for="group in savedDeviceGroups"
             :group="group">
      </Group>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Group from "./group/Group";

  export default {
    name: "SavedGroups",
    components: {Group},
    computed: {
      ...mapState(["savedDeviceGroups", "showSearch"])
    },
    methods: {
      toggleSearch() {
        this.$store.commit("toggleSearch");
      }
    }
  }
</script>
