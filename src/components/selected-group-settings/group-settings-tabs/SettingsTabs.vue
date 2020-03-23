<template>
  <div class="h-full w-1/12 flex flex-col items-center justify-around border-solid border-r border-highlight">
    <div class="flex-grow w-full flex items-center justify-center hover:bg-highlight rounded
         transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
         transform active:scale-95 cursor-pointer text-lg text-secondary
         hover:text-focus p-2">
      <i class="fas fa-paint-brush text-2xl"></i>
    </div>
    <div class="flex-grow w-full flex items-center justify-center hover:bg-highlight rounded
         transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
         transform active:scale-95 cursor-pointer text-lg text-secondary
         hover:text-focus p-2">
      <i class="far fa-clock text-2xl"></i>
    </div>
    <div class="flex-grow w-full flex items-center justify-center hover:bg-highlight rounded
         transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
         transform active:scale-95 cursor-pointer text-lg text-secondary
         hover:text-focus p-2">
      <i class="fas fa-tasks text-2xl"></i>
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
