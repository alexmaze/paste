/**
 * @typedef {Object<string, any>} ClipboardRecorderConfig
 * @property {string} timeInterval clipboard record interval
 */

class ClipboardRecorder {
  /**
   * @type ClipboardRecorderConfig
   */
  config = {
    timeInterval: 100
  }

  /**
   * @type Electron.Clipboard
   */
  clipboard = null

  /**
   * @type string
   */
  last = ""

  /**
   * @type string[]
   */
  history = []

  /**
   *
   * @param {Electron.Clipboard} clipboard
   * @param {ClipboardRecorderConfig} config
   */
  constructor(clipboard, config = {}) {
    this.config = {
      ...this.config,
      ...config
    }
    this.clipboard = clipboard

    setInterval(this.record.bind(this), this.config.timeInterval)
  }

  record() {
    const text = this.clipboard.readText()
    if (this.last === text) {
      return
    }

    this.last = text
    this.history.push(text)
  }

  clear() {
    this.history = []
  }
}

module.exports = { ClipboardRecorder }
