<template>
  <div id="app" class="h-full flex flex-row items-center text-primary bg-backgroundThird">
    <SavedGroups></SavedGroups>
    <ToastContainer></ToastContainer>
  </div>
</template>

<script>
  import "./assets/css/main.css"
  import SavedGroups from "./components/saved-groups/SavedGroups";
  import ToastContainer from "./components/toast/ToastContainer";

  export default {
    name: 'App',
    components: {ToastContainer, SavedGroups},
  }
</script>

<style>
  html, body {
    height: 100%;
    overflow: hidden;
  }

  input[type=range] {
    -webkit-appearance: none;
  }

  input[type=range]:focus {
    outline: none;
  }

  input[type=range]::-webkit-slider-runnable-track {
    height: 5px;
    background: rgb(113,153,188);
  ;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: rgb(95,95,97);
    height: 20px;
    width: 20px;
    margin-top: -7.5px;
    border-radius: 15px;
    cursor: pointer;
  }

  input[type=range]::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }
</style>
