<template>
  <div class="search h-full p-3 rounded-r flex-grow flex flex-col items-center">
    <div class="w-full flex flex-col items-center">
      <div class=" m-5 text-xl">
        White
      </div>
      <div class="w-full flex flex-row justify-around">
        <div class="m-2 w-3/12 flex justify-center">
          Brightness
        </div>
        <div class="m-2 flex-grow">
          <input
              v-model="brightness"
              class="w-full"
              type="range"
              min="0"
              max="100">
        </div>
        <div class="m-2 w-1/12">
          {{brightness}}%
        </div>
      </div>
      <div class="w-full flex flex-row justify-around">
        <div class="m-2 w-3/12 flex justify-center">
          Temperature
        </div>
        <div class="m-2 flex-grow">
          <input
              v-model="temperature"
              class="w-full"
              type="range"
              min="1700"
              max="6500">
        </div>
        <div class="m-2 w-1/12">
          {{temperature}}k
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col items-center">
      <div class=" m-5 text-xl">
        Color
      </div>
      <div class="w-full flex flex-row justify-around">
        <div class="m-2 w-3/12 flex justify-center">
          Brightness
        </div>
        <div class="m-2 flex-grow">
          <input
              v-model="aa"
              class="w-full"
              type="color">
        </div>
        <div class="m-2 w-1/12">
          {{aa}}
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
        temperature: 3000,
        aa: 122
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

</style>
