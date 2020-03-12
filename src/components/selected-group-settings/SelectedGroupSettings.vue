<template>
  <div class="selected-group-settings">
    <div v-if="selectedGroup">
      {{selectedGroup.name}}
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "SelectedGroupSettings",
    computed: {
      ...mapGetters(["selectedGroup"])
    }
  }
</script>

<style scoped>
  .selected-group-settings {
    flex-grow: 3;

    background: rgb(244, 219, 144);
  }
</style>
