<template>
  <div
      class="pointer-events-auto flex justify-between m-3 px-5 py-2 rounded-full bg-backgroundReversed text-primaryReversed">
    <div>
      <span class="">{{toast.text}}</span>
    </div>
    <div class="flex items-center">
      <i class="transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
        transform active:scale-90 cursor-pointer rounded-full fas fa-times text-secondaryReversed
        hover:text-focus p-1"
         @click="closeToast"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    props: ['toast'],
    data() {
      return {
        clock: null,
      }
    },
    created() {
      this.clock = setTimeout(this.closeToast, this.toast.time);
    },
    beforeDestroy() {
      clearTimeout(this.clock);
    },
    methods: {
      closeToast() {
        this.$store.dispatch('toast/removeToast', this.toast.id);
      }
    }
  }
</script>

<style scoped>

</style>
