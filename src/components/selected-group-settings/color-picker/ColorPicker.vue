<template>
  <div class="search h-full w-full p-1 rounded-r flex-grow flex flex-col items-center">
    <div class="w-full mt-2 border-sold border-b border-secondary"></div>
    <div class="w-full flex flex-col items-center">
      <div class=" m-1 text-lg">
        White
      </div>
      <div class="w-full flex flex-row justify-around">
        <div class="flex-grow">
          <input
              v-model="temperature"
              class="w-full cursor-pointer"
              type="range"
              min="1700"
              max="6500">
        </div>
        <div class="mx-4 w-1/12">
          {{temperature}}k
        </div>
      </div>
    </div>
    <div class="w-full mt-4 border-sold border-b border-secondary"></div>
    <div class="w-full flex-grow flex flex-col items-center">
      <div class=" m-1 text-lg">
        Color
      </div>
      <div class="w-full flex flex-row items-center justify-around">
        <canvas class="rgb-gradient w-full h-1/2 rounded-full cursor-pointer border-2 border-solid border-focus"></canvas>
      </div>
    </div>
    <div class="w-full mt-4 border-sold border-b border-secondary"></div>
    <div class="w-full flex-grow flex flex-col items-center">
      <div class="m-1 text-lg flex justify-center items-center">
        Brightness
      </div>
      <div class="w-full flex flex-row justify-around">
        <div class="mr-2 flex-grow">
          <input
              v-model.number="brightness"
              @change="setBrightness"
              class="w-full cursor-pointer"
              type="range"
              min="0"
              max="100">
        </div>
        <div class="m-1 w-1/12 flex justify-center items-center">
          {{brightness}}%
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Device from "../../device/device";
  import {mapState} from "vuex";

  export default {
    name: "ColorPicker",
    data() {
      return {
        brightness: 50,
        temperature: 3000,
        devices: [],
      }
    },
    computed: {
      ...mapState(["selectedGroup"]),
    },
    beforeDestroy() {
      if (this.devices.length === 0) {
        this.devices.forEach(device => {
          device.disconnect();
        })
      }
    },
    methods: {
      setBrightness() {
        if (this.devices.length === 0) {
          this.selectedGroup.devices.forEach(device => {
            this.devices.push(new Device({host: device.host, port: device.port}));
          })
        }

        this.devices.forEach(device => {
          device.setBrightness(this.brightness, response => {
            console.log({response});
          });
        })
      }
    }
  }
</script>

<style scoped>
  .rgb-gradient {
    background: radial-gradient(white, rgba(255, 255, 255, 0) 50%), conic-gradient(red, yellow, lime, aqua, blue, magenta, red);
  }
</style>
