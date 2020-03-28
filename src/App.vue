<template>
  <div id="app" class="h-full flex flex-row items-center text-primary p-2 bg-darkest">
    <SavedGroups></SavedGroups>
  </div>
</template>

<script>
  import "./assets/css/main.css"
  import SavedGroups from "./components/saved-groups/SavedGroups";

  export default {
    name: 'App',
    components: {SavedGroups},
  }
</script>

<style>
  html, body {
    height: 100%;
  }

  input[type=range] {
    -webkit-appearance: none;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]::-webkit-slider-runnable-track {
    height: 5px;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: rgb(242, 242, 244);
    height: 20px;
    width: 20px;
    margin-top: -7.5px;
    border-radius: 15px;
    cursor: pointer;
  }
</style>
