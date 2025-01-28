import utils from "./utils.js";

class Prove {
  utils = utils();
  
  config = {};
  onLoad() {}
  onEvent() {}
  onClose() {}
  onSuccess() {}

  constructor(props = {}) {
    this.initialize(props);
  }

  initialize({
    onSuccess,
    onClose,
    onEvent,
    onLoad,
    requestId,
    ...config
  } = {}) {
    this.config = { ...this.config, ...config };
    this.requestId = requestId || this.requestId;

    this.onLoad = onLoad || this.onLoad;
    this.onEvent = onEvent || this.onEvent;
    this.onClose = onClose || this.onClose;
    this.onEvent = onEvent || this.onEvent;
    this.onSuccess = onSuccess || this.onSuccess;
  }

  setup(props = {}) {
    this.utils.addStyle();
    if (props) this.initialize(props);

    this.utils.init({
      qs: this.config,
      requestId: this.requestId,
      onEvent: this.onEvent,
      onLoad: this.onLoad,
    });
  }

  open() {
    this.utils.openWidget();
    const that = this;

    this.eventHandler = function (event) {
      if (event.data.type === "mono.prove.widget.closed") {
        that.close(event.data.data);
        return;
      }
      if (event.data.type === "mono.prove.identity_verified") {
        that.onSuccess(event.data.data);
        that.close(event.data.data);
        return;
      }
      if (event.data.type.startsWith("mono.")) {
        that.onEvent(event.data.type, event.data.data);
      }
    };

    window.addEventListener("message", this.eventHandler);
  }

  close() {
    window.removeEventListener("message", this.eventHandler);
    this.utils.closeWidget();
    this.onClose();
  }
}

if (typeof window !== "undefined") window.Prove = Prove;

export default Prove

