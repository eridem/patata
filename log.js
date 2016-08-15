'use strict'

const colors = require('colors')
module.exports = {
  log: function (message) {
    console.log(`[Patata]`.yellow, ` ${message}`.gray)
  },
  exit: function (message, exitCode) {
    console.error(`[Patata]`.yellow, ` ${message}`.red)
    process.exit(exitCode || 1)
  }
}
