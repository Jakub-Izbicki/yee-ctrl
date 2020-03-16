<template>
  <div v-if="!showSearch" class="flex-grow bg-dark">
  </div>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "SelectedGroupSettings",
    computed: {
      ...mapState(["showSearch"])
    }
  }
</script>

<style scoped>
</style>
