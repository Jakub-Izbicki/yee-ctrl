<template>
  <div id="app" class="h-full flex flex-row items-center text-primary p-2 bg-darkest">
    <SavedGroups></SavedGroups>
    <Search></Search>
    <SelectedGroupSettings></SelectedGroupSettings>
  </div>
</template>

<script>
  import "./assets/css/main.css"
  import SelectedGroupSettings from "./components/selected-group-settings/SelectedGroupSettings";
  import Search from "./components/search/Search";
  import SavedGroups from "./components/saved-groups/SavedGroups";

  export default {
    name: 'App',
    components: {SavedGroups, Search, SelectedGroupSettings},
  }
</script>

<style>
  html, body {
    height: 100%;
  }
</style>
