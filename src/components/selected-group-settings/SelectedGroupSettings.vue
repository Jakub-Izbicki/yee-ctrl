<template>
  <div v-if="!showSearch" class="h-full rounded-r flex-grow flex flex-row items-center overflow-hidden bg-dark">
    <SettingsTabs></SettingsTabs>
    <ColorPicker></ColorPicker>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import SettingsTabs from "./group-settings-tabs/SettingsTabs";
  import ColorPicker from "./color-picker/ColorPicker";

  export default {
    name: "SelectedGroupSettings",
    components: {ColorPicker, SettingsTabs},
    computed: {
      ...mapState(["showSearch"])
    }
  }
</script>

<style scoped>
</style>
