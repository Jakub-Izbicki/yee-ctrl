<template>
  <div class="transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
  transform active:scale-90 cursor-pointer rounded-full"
       @click="this.click">
    <i :class="[this.customClass]"></i>
  </div>
</template>

<script>
  export default {
    name: "IconButton",
    props: ["customClass", "click"]
  }
</script>

<style scoped>

</style>
