import EventEmitter from "events";
import dgram from "dgram";

export default class Discovery extends EventEmitter {
  address = '239.255.255.250';
  port = 1982;
  discoveryMessage = 'M-SEARCH * HTTP/1.1\r\nMAN: "ssdp:discover"\r\nST: wifi_bulb\r\n';
  supportedHeaders = ['id', 'Location', 'power', 'bright', 'model', 'rgb',
    'hue', 'sat', 'ct', 'color_mode', 'support'];
  searchInterval;
  searchIterations = 0;
  searchMaxIterations = 3;

  constructor() {
    super();
    this.socket = dgram.createSocket("udp4");
  }

  search() {
    this.socket.on("listening", () => {
      this.socket.addMembership(this.address);
      const msg = Buffer.from(this.discoveryMessage);

      this.searchInterval = setInterval(() => {
        this.socket.send(msg, 0, msg.length, this.port, this.address);
        this.searchIterations++;

        if (this.searchIterations >= this.searchMaxIterations) {
          this.emit("endOfSearch");
          clearInterval(this.searchInterval);
        }
      }, 1000);
    });

    this.socket.on("message", (msg) => {
      this.onDeviceDiscovered(msg);
    });

    this.socket.bind(this.port, () => {
      this.socket.setBroadcast(true);
    });
  }

  onDeviceDiscovered(msg) {
    const response = msg.toString().split('\r\n');
    let device = {};

    this.supportedHeaders.forEach((header) => {
      response.forEach((responseLine) => {
        if (responseLine.indexOf(`${header}:`) >= 0) {
          device[header] = responseLine.slice(`${header}:`.length + 1);
        }
      })
    });

    if (device.Location !== undefined) {
      const url = require("url");
      let location = url.parse(device.Location);
      device.host = location.hostname;
      device.port = location.port;
    }

    if (device.id !== undefined) {
      this.emit("onDeviceDiscovered", device);
    }
  }

  close() {
    this.socket.close();
    if (this.searchInterval !== undefined) {
      clearInterval(this.searchInterval);
    }
  }
}


