const osa = require("node-osascript")

function paste() {
  osa.execute(`
  tell application "System Events"
    keystroke "v" using command down
  end tell
  `)
}

function writeText(text) {
  osa.execute(`
  tell application "System Events"
    keystroke "${text}"
  end tell
  `)
}

module.exports = { paste, writeText }
