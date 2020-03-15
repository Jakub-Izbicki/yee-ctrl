<template>
  <div id="app">
    <div class="horizontal-wrapper">
      <Search></Search>
      <RenameGroup></RenameGroup>
      <SavedGroups></SavedGroups>
      <SelectedGroupSettings></SelectedGroupSettings>
    </div>
  </div>
</template>

<script>
  import "./assets/css/main.css"
  import {mapState} from 'vuex';
  import SelectedGroupSettings from "./components/selected-group-settings/SelectedGroupSettings";
  import Search from "./components/search/Search";
  import SavedGroups from "./components/saved-groups/SavedGroups";
  import RenameGroup from "./components/saved-groups/rename-group/RenameGroup";

  export default {
    name: 'App',
    components: {RenameGroup, SavedGroups, Search, SelectedGroupSettings},
    computed: {
      ...mapState([
        'name'
      ])
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
  }

  #app {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;

    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #f2f2f4;
  }

  .horizontal-wrapper {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
  }
</style>
