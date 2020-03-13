<template>
  <div class="search-list-wrapper">
    <select class="search-list" size="2">
      <option class="search-list-item"
          :key="device.id" v-for="device in this.foundDevices">
        {{device.host}}
      </option>
    </select>
    <div class="add-button-wrapper">
      <button>Add selected</button>
    </div>
    <div class="saved-groups-list">
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: "SearchList",
    computed: {
      ...mapState(["foundDevices"])
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
</style>
