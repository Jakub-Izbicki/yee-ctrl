<template>
  <div v-if="showSearch" class="search">
    <div class="mask">
      <div class="window">
        <div class="header">
          <div>Remove group?</div>
          <button @click="hideSearch">&times;</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RemoveGroup"
  }
</script>

<style scoped>
  .mask {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
    z-index: 1;

    display: flex;
    flex-direction: column;

    background: rgba(28, 28, 28, 0.77);
  }

  .window {
    width: 90%;
    height: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;

    display: flex;
    flex-direction: column;

    background: rgb(82, 80, 87);
  }

  .header {
    flex-grow: 1;
    flex-basis: 0;

    display: flex;
    flex-direction: row;
  }
</style>
