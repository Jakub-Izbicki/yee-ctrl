<template>
  <div class="flex-grow-0 w-1/3 flex flex-col items-center bg-darker">
    <i @click="showSearch" class="fas fa-search text-3xl text-secondary"></i>
    <SavedGroupsList></SavedGroupsList>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import SavedGroupsList from "./SavedGroupsList";

  export default {
    name: "SavedGroups",
    components: {SavedGroupsList},
    computed: {
      ...mapState(["savedBulbGroups"])
    },
    methods: {
      showSearch() {
        this.$store.commit("showSearch");
      }
    }
  }
</script>
