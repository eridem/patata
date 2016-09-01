'use strict'

require('colors')

module.exports = {
  log: function (message, description) {
    if (!message) return

    if (description) {
      message = message.gray
      description = description.green
    } else {
      message = message.gray
    }
    console.log('[Patata]'.blue, message, description || '')
  },
  warn: function (messages) {
    messages = typeof messages === 'string' ? [messages] : messages instanceof Array ? messages : []
    messages.forEach(function (message) {
      console.error('[Patata]'.blue, message.yellow)
    }, this)
  },
  exit: function (messages) {
    messages = typeof messages === 'string' ? [messages] : messages instanceof Array ? messages : []
    messages.forEach(function (message) {
      console.error('[Patata]'.red, message.red)
    }, this)
    process.exit(1)
  }
}
