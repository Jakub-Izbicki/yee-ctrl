<template>
  <div class="flex">
    <div>
      {{device.host}}
    </div>

    <div v-if="showConnectionOk"
         class="mx-2 font-semibold text-lg text-ok">
      OK
    </div>
    <i v-if="isConnecting"
       class="fas fa-spinner connecting text-lg text-secondary p-1 mx-2"></i>
    <i v-if="showConnectButton"
       class="button-edit-name fas fa-satellite-dish
        transition-transform duration-75 ease-in-out hover:bg-highlight active:bg-selected
        transform active:scale-90 cursor-pointer rounded-full text-lg text-secondary
        hover:text-focus p-1 mx-2"
       @click.stop="testConnection"></i>
  </div>
</template>

<script>
  import Device from "../../device/device";

  export default {
    name: "Device",
    props: ["device"],
    data() {
      return {
        connection: undefined,
        showConnectButton: true,
        isConnecting: false,
        showConnectionOk: false
      }
    },
    beforeDestroy() {
      if (this.connection !== undefined) {
        this.connection.disconnect();
      }
    },
    methods: {
      testConnection() {
        if (this.connection === undefined) {
          this.connection = new Device({host: this.device.host, port: this.device.port});
        }

        this.connection.on("response", (response) => {
          console.log(response);
        });

        const connectingEndOk = () => {
          this.isConnecting = false;
          this.showConnectionOk = true;
          setTimeout(() => {
            this.showConnectionOk = false;
            this.showConnectButton = true;
          }, 2000);
        };

        this.isConnecting = true;
        this.showConnectButton = false;
        this.connection.getPower((response) => {
          if (this.connection.isOn(response)) {
            this.connection.turnOff();
            setTimeout(() => this.connection.turnOn(connectingEndOk), 500);
          } else {
            this.connection.turnOn();
            setTimeout(() => this.connection.turnOff(connectingEndOk), 500);
          }
        });
      }
    }
  }
</script>

<style scoped>
  .connecting {
    pointer-events: none;
    animation: spin 0.5s linear infinite;
  }

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
</style>
