<template>
  <div id="app" class="h-full flex flex-row text-primary">
    <Search></Search>
    <RenameGroup></RenameGroup>
    <SavedGroups></SavedGroups>
    <SelectedGroupSettings></SelectedGroupSettings>
  </div>
</template>

<script>
  import "./assets/css/main.css"
  import SelectedGroupSettings from "./components/selected-group-settings/SelectedGroupSettings";
  import Search from "./components/search/Search";
  import SavedGroups from "./components/saved-groups/SavedGroups";
  import RenameGroup from "./components/saved-groups/rename-group/RenameGroup";

  export default {
    name: 'App',
    components: {RenameGroup, SavedGroups, Search, SelectedGroupSettings},
  }
</script>

<style>
  html, body {
    height: 100%;
  }
</style>
