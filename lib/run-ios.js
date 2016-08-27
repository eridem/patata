'use strict'

module.exports = function (opts) {
  const path = require('path')
  require(path.join(__dirname, '/run-generic.js'))(opts)
}
