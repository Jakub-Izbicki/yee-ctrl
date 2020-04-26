<template>
  <div class="absolute pointer-events-none flex flex-col justify-end z-50 h-full w-full">
    <transition-group name="toasts" tag="div" class="w-full relative">
      <Toast v-for="toast in toasts"
             :key="toast.id"
             :toast="toast"
      ></Toast>
    </transition-group>
  </div>
</template>

<script>
  import Toast from "./Toast";
  import {createNamespacedHelpers} from "vuex";

  export default {
    name: "ToastContainer",
    components: {Toast},
    computed: {
      ...createNamespacedHelpers('toast').mapState({
        toasts: state => state.toasts,
      })
    }
  }
</script>

<style scoped>
  .toasts-enter, .toasts-leave-to {
    transform: translateY(10px);
    opacity: 0;

  }

  .toasts-enter-active {
    transition: all 0.5s;
  }

  .toasts-leave-active {
    position: absolute;
    left: 0;
    right: 0;
  }

  .toasts-move {
    transition: all 0.5s;
  }
</style>
