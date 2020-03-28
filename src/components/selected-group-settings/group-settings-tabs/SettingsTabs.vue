<template>
  <div class="w-full flex flex-row content-around rounded-lg">
    <div class="flex-grow w-full flex items-center justify-center hover:bg-highlight rounded
         transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
         transform active:scale-95 cursor-pointer text-lg text-secondary
         hover:text-focus p-1">
      <i class="fas fa-paint-brush text-xl"></i>
    </div>
    <div class="flex-grow w-full flex items-center justify-center hover:bg-highlight rounded
         transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
         transform active:scale-95 cursor-pointer text-lg text-secondary
         hover:text-focus p-1">
      <i class="far fa-clock text-xl"></i>
    </div>
    <div class="flex-grow w-full flex items-center justify-center hover:bg-highlight rounded
         transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
         transform active:scale-95 cursor-pointer text-lg text-secondary
         hover:text-focus p-1">
      <i class="fas fa-tasks text-xl"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SettingsTabs"
  }
</script>

<style scoped>
</style>
