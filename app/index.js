const { app, globalShortcut, BrowserWindow, Menu } = require("electron");
const { ClipboardRecorder } = require("./recorder");
const system = require("./system");

app.on("ready", () => {
  const electron = require("electron");
  const { screen, clipboard } = electron;
  const clipRec = new ClipboardRecorder(clipboard);
  let win = null;

  const pasteFlag = globalShortcut.register("Shift+Cmd+V", () => {
    const pos = screen.getCursorScreenPoint();

    if (win) {
      win.close();
    }

    app.dock.hide();
    win = new BrowserWindow({
      x: pos.x,
      y: pos.y,
      frame: false,
      alwaysOnTop: true,
      useContentSize: true,
      webPreferences: {
        preload: "../render/clipboard.js"
      }
    });
    win.loadFile("../render/clipboard.html");
    win.setAlwaysOnTop(true, "floating");
    win.setVisibleOnAllWorkspaces(true);
    win.setFullScreenable(false);

    // setTimeout(() => {
    //   win.blur()
    //   win.close()
    //   app.hide()
    //   system.writeText("hahaha")
    // }, 1000)
  });
  console.log("status: ", pasteFlag);
});

app.on("will-quit", () => {
  console.log("quit");
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", function() {
  console.log("cloased");
});
