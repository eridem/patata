'use strict'

module.exports = function (opts) {
  const path = require('path')
  const { resolve, reject, argv, log, patata, platform, binary, tags, device } = opts
  require(path.join(__dirname, '/run-generic.js'))(opts)
}
