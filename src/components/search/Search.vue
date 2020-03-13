<template>
  <div v-if="showSearch" class="search">
    <div class="search-mask">
      <div class="search-window">
        <div class="search-window-header">
          <div>Search</div>
          <button @click="hideSearch">&times;</button>
        </div>
        <div>
          <button class="refresh-button-wrapper" @click="searchForDevices">Refresh</button>
        </div>
        <SearchList></SearchList>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import SearchList from "./SearchList";
  import Discovery from "./discovery";

  export default {
    name: "Search",
    components: {SearchList},
    data() {
      return {
        discoveryService: undefined
      };
    },
    computed: {
      ...mapState(["showSearch"])
    },
    methods: {
      hideSearch() {
        this.$store.commit("hideSearch");
      },
      searchForDevices() {
        if (this.discoveryService !== undefined) {
          this.discoveryService.close();
        }

        this.discoveryService = new Discovery();

        this.discoveryService.on("onDeviceDiscovered", (device) => {
          this.$store.commit("addFoundDevice", device);
        });

        this.discoveryService.search();
      }
    }
  }
</script>

<style scoped>
  .search-mask {
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

  .search-window {
    width: 90%;
    height: 90%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: fixed;

    display: flex;
    flex-direction: column;

    background: antiquewhite;
  }

  .search-window-header {
    display: flex;
    flex-direction: row;
  }

  .refresh-button-wrapper {
    display: flex;
    flex-direction: row;
  }
</style>
