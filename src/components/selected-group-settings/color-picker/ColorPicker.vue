<template>
  <div class="search h-full w-full p-1 rounded-r flex-grow flex flex-col items-center">
    <div class="w-full mt-2 border-sold border-b border-highlight"></div>
    <div class="w-full flex flex-col items-center">
      <div class=" m-1 text-lg">
        White
      </div>
      <div class="w-full flex flex-row justify-around">
        <div class="flex-grow">
          <input
              v-model="temperature"
              @click="printWhite"
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
    <div class="w-full mt-4 border-sold border-b border-highlight"></div>
    <div class="w-full flex-grow flex flex-col items-center">
      <div class=" m-1 text-lg">
        Color
      </div>
      <div class="w-full flex flex-row items-center justify-around">
        <canvas class="rgb-gradient w-full rounded-lg cursor-pointer border-2 border-solid border-primary"></canvas>
      </div>
    </div>
    <div class="w-full mt-4 border-sold border-b border-highlight"></div>
    <div class="w-full flex-grow flex flex-col items-center">
      <div class="w-full flex flex-row justify-around mt-6">
        <div class="m-1 w-3/12 flex justify-center items-center">
          Brightness
        </div>
        <div class="m-2 flex-grow">
          <input
              v-model="brightness"
              @change="printWhite"
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
  export default {
    name: "ColorPicker",
    data() {
      return {
        brightness: 50,
        temperature: 3000
      }
    },
    methods: {
      printWhite() {
        console.log(`${this.brightness}% - ${this.temperature}k`);
      }
    }
  }
</script>

<style scoped>
  .rgb-gradient {
    /*padding-top: 25%;*/
    background: radial-gradient(white, rgba(255, 255, 255, 0) 50%), conic-gradient(red, yellow, lime, aqua, blue, magenta, red);
  }

  .rgb-selection {
    background: #3ce6ff;
  }
</style>
