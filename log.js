'use strict'

const colors = require('colors')
module.exports = {
  log: function (message, description) {
    if (description) {
      message = message.gray
      description = description.green
    } else {
      message = message.gray
    }
    console.log(`[Patata]`.blue, message, description ? description : '')
  },
  exit: function (message, exitCode) {
    console.error(`[Patata]`.red, message.red)
    process.exit(exitCode || 1)
  }
}
