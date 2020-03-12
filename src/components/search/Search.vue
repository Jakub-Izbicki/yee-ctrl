<template>
  <div v-if="showSearch" class="search">
    <div class="search-mask">
      <div class="search-window">
        <div class="search-window-header">
          <div>Search</div>
          <button @click="hideSearch">&times;</button>
        </div>
        <div>
          <button class="refresh-button-wrapper" @click="searchForBulbs">Refresh</button>
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
    computed: {
      ...mapState(["showSearch"])
    },
    methods: {
      hideSearch() {
        this.$store.commit("hideSearch");
      },
      searchForBulbs() {
        let d = new Discovery();
        d.on('started', () => {
          console.log('** Discovery Started **')
        })

        d.on("didDiscoverDevice", (msg) => {
          console.log(msg);
        })

        d.search();
      }
    }
  }
</script>

<style scoped>
  .search {

  }

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
