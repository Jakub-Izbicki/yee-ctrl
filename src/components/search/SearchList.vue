<template>
  <div class="search-list-wrapper">
    <div class="search-list">
      <tr class="search-list-item"
          :key="foundBulb.ip" v-for="foundBulb in this.foundBulbs">
        {{foundBulb.ip}}
      </tr>
    </div>
    <div class="add-button-wrapper">
      <button>Add selected</button>
    </div>
    <div class="saved-groups-list">
      <tr class="saved-group"
          :key="foundBulb.ip" v-for="foundBulb in this.foundBulbs">
        {{foundBulb.ip}}
      </tr>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: "SearchList",
    computed: {
      ...mapState(["foundBulbs"])
    }
  }
</script>

<style scoped>
  .search-list-wrapper {
    display: flex;
    flex-direction: row;
  }

  .search-list {
    flex-grow: 3;

    display: flex;
    flex-direction: column;
  }

  .search-list-item {
    width: 100%;
  }

  .add-button-wrapper {
    flex-grow: 0.1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .saved-groups-list {
    flex-grow: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .saved-group {
  }
</style>
