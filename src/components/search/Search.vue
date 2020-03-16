<template>
  <div v-if="showSearch">
    <div class="mask h-full w-full fixed flex flex-col items-center justify-center bg-darkest">
      <div class="window h-9/10 w-4/5 bg-dark">
        <div class="header flex">
          <div>Search</div>
          <button @click="hideSearch">&times;</button>
        </div>
        <button @click="searchForDevices">Refresh</button>
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
