'use strict'

const colors = require('colors')
module.exports = {
  log: function (message, description) {
    if (description) {
      message = message.blue
      description = description.gray
    } else {
      message = message.gray
    }
    console.log(`[Patata]`.yellow, message, description ? description : '')
  },
  exit: function (message, exitCode) {
    console.error(`[Patata]`.yellow, ` ${message}`.red)
    process.exit(exitCode || 1)
  }
}
