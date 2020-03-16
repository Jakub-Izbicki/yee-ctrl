<template>
  <div v-if="showSearch">
    <div class="mask h-full w-full fixed flex flex-col items-center justify-center bg-darkest">
      <div class="window h-9/10 w-4/5 bg-dark">
        <div class="header">
          <div>Search</div>
          <button @click="hideSearch">&times;</button>
        </div>
        <div class="refresh-button-wrapper">
          <button @click="searchForDevices">Refresh</button>
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
  .window {
    /*width: 90%;*/
    /*height: 90%;*/
    /*top: 50%;*/
    /*left: 50%;*/
    /*transform: translate(-50%, -50%);*/
    /*position: fixed;*/
    /**/
    /*display: flex;*/
    /*flex-direction: column;*/
    /**/
    /*background:  rgb(82, 80, 87);*/
  }

  .header {
    display: flex;
    flex-direction: row;
  }

  .refresh-button-wrapper {
    flex-grow: 1;
    flex-basis: 0;

    display: flex;
    flex-direction: row;
  }
</style>
