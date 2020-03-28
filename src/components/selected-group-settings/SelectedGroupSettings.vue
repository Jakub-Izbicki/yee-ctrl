<template>
  <div class="h-full rounded flex-grow flex flex-col items-center overflow-hidden">
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
