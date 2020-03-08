<template>
  <div id="app">
    <div class="horizontal-wrapper">
      <SavedGroupsList></SavedGroupsList>
      <SelectedGroupSettings></SelectedGroupSettings>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import SavedGroupsList from "./components/saved-groups/SavedGroupsList";
  import SelectedGroupSettings from "./components/selected-group-settings/SelectedGroupSettings";

  export default {
    name: 'App',
    components: {SelectedGroupSettings, SavedGroupsList},
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
    color: #2c3e50;
  }

  .horizontal-wrapper {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
  }
</style>
