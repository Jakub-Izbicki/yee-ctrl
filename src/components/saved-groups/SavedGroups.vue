<template>
  <div class="saved-groups-list">
    <div class="buttons-wrapper">
      <button class="search-button" @click="showSearch">Search</button>
    </div>
    <div class="list-wrapper">
      <SavedGroupsList></SavedGroupsList>
    </div>
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
      },
      isSelected(id) {
        return this.selectedGroup && this.selectedGroup.id === id;
      },
      selectGroup(ip) {
        this.$store.commit("selectGroup", ip);
      }
    }
  }
</script>

<style scoped>
  .saved-groups-list {
    flex-grow: 1;
    flex-basis: 0;

    display: flex;
    flex-direction: column;

    background: rgb(75, 72, 80);
  }

  .buttons-wrapper {
    margin: 10px;
    flex-grow: 1;
    flex-basis: 0;

    display: flex;
    flex-direction: row;
  }

  .list-wrapper {
    margin: 10px;
    flex-grow: 6;

    display: flex;
    flex-direction: column;
  }
</style>
