const electron = require("electron");
const ClipboardRecorder = require("./recorder");
const system = require("./system");

exports.onReady = function() {
  const { screen, clipboard, globalShortcut, BrowserWindow, app } = electron;
  const clipRec = new ClipboardRecorder(clipboard);
  let win = null;
  app.dock.hide();

  globalShortcut.register("Shift+Cmd+V", () => {
    if (win && !win.isDestroyed) {
      win.close();
    }

    global.sharedObject = {
      recorder: clipRec,
      close: () => {
        win.close();
        console.log("close");
      },
      paste: index => {
        selectAndPaste(app, win, clipRec, index);
      }
    };

    const { x, y } = screen.getCursorScreenPoint();
    win = new BrowserWindow({
      x,
      y,
      frame: false,
      alwaysOnTop: true,
      useContentSize: true,
      width: 300,
      height: 200,
      transparent: true,
      webPreferences: {
        nodeIntegration: true
      }
    });
    // win.on("blur", () => {
    //   win.close();
    // });
    win.loadFile("../render/history_menu.html");
    win.setAlwaysOnTop(true, "floating");
    win.setVisibleOnAllWorkspaces(true);
    win.setFullScreenable(false);
  });
};

function selectAndPaste(app, win, rec, index) {
  win.blur();
  win.close();
  app.hide();

  const text = rec.history[index];

  system.writeText(text);
}
