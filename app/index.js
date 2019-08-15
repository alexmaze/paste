const { app, globalShortcut } = require("electron");
const { onReady } = require("./app");

app.on("ready", onReady);

app.on("will-quit", () => {
  console.log("quit");
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", function() {
  console.log("window cloased");
});
