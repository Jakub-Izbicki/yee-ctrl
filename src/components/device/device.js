import EventEmitter from "events"
import net from "net"

export default class Device extends EventEmitter {
  callbackConnections = [];
  timeoutConnections = [];
  connected = false;

  constructor(device) {
    super();
    this.device = device;
    this.debug = this.device.debug || false;
    this.connected = false;
    this.forceDisconnect = false;
    this.timer = null;
    this.tracked_attrs = this.device.tracked_attrs || ["power", "bright", "rgb",
      "flowing", "flow_params", "hue", "sat", "ct"];
    this.polligInterval = this.device.interval || 5000;
    this.retry_timer = null;
  }

  connect() {
    try {
      this.forceDisconnect = false;
      this.socket = new net.Socket();
      this.bindSocket();
      this.socket.connect({host: this.device.host, port: this.device.port},
          () => {
            this.didConnect();
            this.emit("connected");
            this.connected = true;
          })
    } catch (err) {
      this.socketClosed(err)
    }
  }

  disconnect(forceDisconnect = true) {
    this.forceDisconnect = forceDisconnect;
    this.connected = false;
    clearInterval(this.timer);
    this.socket.destroy();
    this.socket = null;
    this.emit("disconnected");
    if (this.forceDisconnect && this.retry_timer) {
      clearTimeout(this.retry_timer);
    }
  }

  bindSocket() {
    this.socket.on("data", (data) => {
      this.onResponse(data);
    });

    this.socket.on("error", (err) => {
      this.emit("socketError", err);
      this.socketClosed(err);
    });

    this.socket.on("end", () => {
      this.emit("socketEnd");
      this.socketClosed();
    });
  }

  socketClosed(err) {
    this.connected = false;

    if (this.forceDisconnect) {
      return;
    }

    if (err && this.debug) {
      console.log("Socket Closed :", err);
      console.log("Reconnecting in 5 secs");
    }
    this.disconnect(false);
    if (this.retry_timer) {
      clearTimeout(this.retry_timer);
      this.retry_timer = null;
    }
    this.retry_timer = setTimeout(this.connect.bind(this), 5000);
  }

  didConnect() {
    this.connected = true;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  onResponse(data) {
    const dataArray = data.toString("utf8").split("\r\n");
    dataArray.forEach((dataString) => {
      if (dataString.length < 1) {
        return;
      }
      try {
        const response = JSON.parse(dataString);
        this.emit("response", response);

        this.removeTimeout(response.id);
        this.runCallback(response);
      } catch (err) {
        console.log(err, dataString);
      }
    })
  }

  removeTimeout(id) {
    if (this.timeoutConnections.some((timeout) => {
      return timeout.id === id;
    })) {
      clearTimeout(this.timeoutConnections.filter((timeout) => {
        return timeout.id === id;
      })[0].timeout);
    }
    this.timeoutConnections = this.timeoutConnections.filter((timeout) => {
      return timeout.id !== id;
    })
  }

  runCallback(response) {
    if (this.callbackConnections.some((callback) => {
      return callback.id === response.id
    })) {
      const connection = this.callbackConnections.filter((callback) => {
        return callback.id === response.id
      })[0];

      this.callbackConnections = this.callbackConnections.filter((callback) => {
        return callback.id !== response.id
      });

      connection.callback(response);
    }
  }

  getPower(callback) {
    this.sendCommand({
          method: "get_prop",
          params: ["power"]
        },
        callback)
  }

  isOn(response) {
    return response.result && response.result[0] === "on";
  }

  turnOn(callback) {
    this.turn("on", callback);
  }

  turnOff(callback) {
    this.turn("of", callback);
  }

  turn(state, callback) {
    this.sendCommand({
          method: "set_power",
          params: [state, "smooth", 300]
        },
        callback);
  }

  setBrightness(percentageInt, callback) {
    this.sendCommand({
          method: "set_bright",
          params: [percentageInt, "smooth", 300]
        },
        callback);
  }

  setWhite(tempInt, callback) {
    this.sendCommand({
          method: "set_ct_abx",
          params: [tempInt, "smooth", 300]
        },
        callback);
  }

  sendCommand(data, callback) {
    const id = this.generateRequestId();
    this.addToTimeoutQueue(id);
    this.addCallbackToQueue(id, callback);

    console.log({request: JSON.stringify({id: id, ...data})});

    const call = () => {
      const cmd = JSON.stringify({id: id, ...data});
      if (this.socket) {
        try {
          this.socket.write(cmd + "\r\n");
        } catch (err) {
          this.socketClosed(err);
        }
      }
    };

    if (this.connected) {
      call();
    } else {
      this.on("connected", () => call());
      this.connect();
    }
  }

  generateRequestId() {
    let id = 1;
    while (this.timeoutConnections.some((timeout) => {
      return timeout.id === id;
    })) {
      id++;
    }

    return id;
  }

  addToTimeoutQueue(id) {
    const timeout = setTimeout(() => {
      this.removeTimeout(id);
      this.emit("timeout", id);
    }, 5000);
    this.timeoutConnections.push({id, timeout});
  }

  addCallbackToQueue(id, callback) {
    if (callback !== undefined) {
      this.callbackConnections.push({id, callback});
    }
  }
}
