<template>
  <div class="saved-groups-list">
    <div class="buttons-wrapper">
      <button class="search-button" @click="showSearch">Search</button>
    </div>
    <div class="list-wrapper">
      <div class="list-item"
           v-bind:class="{'selected-item': isSelected(group.id)}"
           :key="group.id" v-for="group in this.savedBulbGroups"
           @click="selectGroup(group.id)">
        <div class="list-item-group-name">
          <b>{{group.name}}</b>
        </div>
        <div class="list-item-bulbs-list"
             :key="bulb" v-for="bulb in group.ips">
          {{bulb}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'

  export default {
    name: "SavedGroupsList",
    computed: {
      ...mapState(["savedBulbGroups"]),
      ...mapGetters(["selectedGroup"])
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

    display: flex;
    flex-direction: column;

    background: rgb(244, 181, 101);
  }

  .buttons-wrapper {
    margin: 10px;
    flex-grow: 1;

    display: flex;
    flex-direction: row;

    background: antiquewhite;
  }

  .list-wrapper {
    margin: 10px;
    flex-grow: 6;

    display: flex;
    flex-direction: column;

    background: antiquewhite;
  }

  .search-button {
  }

  .list-item {
    padding: 5px;

    cursor: pointer;
    transition: background 0.1s;
  }

  .list-item:hover {
    background: cadetblue;
  }

  .selected-item {
    background: aqua;
  }

  .selected-item:hover {
    background: aqua;
  }
</style>
