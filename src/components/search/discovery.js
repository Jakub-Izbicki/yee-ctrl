import EventEmitter from "events";
import dgram from "dgram";
import url from "url";

export default class Discovery extends EventEmitter {
  // address = '239.255.255.250';
  // port = 1982;
  // discoveryMessage = 'M-SEARCH * HTTP/1.1\\r\\nMAN: \\"ssdp:discover\\"\\r\\nST: wifi_bulb\\r\\n';
  //
  // constructor() {
  //   super();
  //   this.socket = dgram.createSocket("udp4");
  // }
  //
  // search() {
  //   this.socket.on("listening", () => {
  //     this.socket.addMembership(this.address);
  //     const msg = Buffer.from(this.discoveryMessage);
  //
  //     this.socket.send(msg, 0, msg.length, this.port, this.address);
  //     this.emit("started");
  //   });
  //
  //   this.socket.on("message", (msg) => {
  //     this.onDeviceDiscovered(msg);
  //   });
  //
  //   this.socket.bind(this.port, () => {
  //     this.socket.setBroadcast(true);
  //   });
  // }
  //
  // onDeviceDiscovered(msg) {
  //   console.log(msg.toString().split('\r\n'));
  // }
  supportedHeaders = ['id', 'Location', 'power', 'bright', 'model', 'rgb',
    'hue', 'sat', 'ct', 'color_mode', 'support']
  options = {
    port: 1982,
    multicastAddr: '239.255.255.250',
    discoveryMsg: 'M-SEARCH * HTTP/1.1\\r\\nMAN: \\"ssdp:discover\\"\\r\\nST: wifi_bulb\\r\\n',
  }

  constructor() {
    super()
    this.socket = dgram.createSocket('udp4')
  }

  discover() {
    const buffer = Buffer.from(this.options.discoveryMsg)
    this.socket.send(buffer, 0, buffer.length, this.options.port,
        this.options.multicastAddr)
  }

  search() {
    this.socket.on('listening', () => {
      this.socket.addMembership(this.options.multicastAddr)
      this.discover()
      this.emit('started')
    })

    this.socket.on('message', (message) => {
      this.didDiscoverDevice(message)
    })

    this.socket.bind(this.options.port, () => {
      this.socket.setBroadcast(true)
    })
  }

  didDiscoverDevice(response) {
    const headers = response.toString().split('\r\n');
    var device = {}
    headers.forEach((header) => {
      this.supportedHeaders.forEach((supportedHeader) => {
        const checkHeader = supportedHeader + ':'
        if (header.indexOf(checkHeader) >= 0) {
          device[supportedHeader] = header.slice(checkHeader.length + 1)
        }
      })
    })

    if (device.id && device.Location) {
      const parsedUrl = url.parse(device.Location)
      device.host = parsedUrl.hostname
      device.port = parsedUrl.port
      this.emit('didDiscoverDevice', device)
    }
  }
}


