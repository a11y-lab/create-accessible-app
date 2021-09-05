const url = require("url");
const AuditOverlay = require("./lib");
const wdsSocketPath = "ws";

// init overlay
AuditOverlay.update();

// Connect to WebpackDevServer via a socket.
const connection = new WebSocket(
  url.format({
    protocol: window.location.protocol === "https:" ? "wss" : "ws",
    hostname: window.location.hostname,
    port: window.location.port,
    pathname: wdsSocketPath || "/ws",
    slashes: true,
  })
);

// Unlike WebpackDevServer client, we won't try to reconnect
// to avoid spamming the console. Disconnect usually happens
// when developer stops the server.
connection.onclose = function () {
  if (typeof console !== "undefined" && typeof console.info === "function") {
    console.info(
      "The development server has disconnected.\nRefresh the page if necessary."
    );
  }
};

let mostRecentCompilationHash = null;
let hasCompileErrors = false;

const clearOutdatedErrors = () => {
  if (typeof console !== "undefined" && typeof console.clear === "function") {
    if (hasCompileErrors) {
      console.clear();
    }
  }
};

const handleSuccess = () => {
  clearOutdatedErrors();
};

// Triggered when there is a newer version of the code available.
const handleAvailableHash = (hash) => {
  // Update last known compilation hash.
  mostRecentCompilationHash = hash;
};

connection.onmessage = (e) => {
  const message = JSON.parse(e.data);
  switch (message.type) {
    case "hash":
      handleAvailableHash(message.data);
      break;
    case "still-ok":
    case "ok":
      handleSuccess();
      break;
    case "content-changed":
      // Triggered when a file from `contentBase` changed.
      window.location.reload();
      break;
    default:
    // Do nothing.
  }
};

// force update on init
AuditOverlay.update();
