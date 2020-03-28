<template>
  <div class="flex ml-2">
    <div>
      {{device.host}}
    </div>
    <i class="button-edit-name fas fa-satellite-dish
        transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
        transform active:scale-90 cursor-pointer rounded-full text-lg text-secondary
        hover:text-focus p-1 mx-2"
       @click.stop="testConnection"></i>
  </div>
</template>

<script>
  export default {
    name: "Device",
    props: ["device"],
    methods: {
      testConnection() {

      }
    }
  }
</script>

<style scoped>

</style>
