'use strict'

module.exports = function (dep) {
  let patataSingleton

  const get = function () {
    if (!patataSingleton) {
      const { join, __rootdirname } = dep
      const patataPath = join(__rootdirname, '/lib/sdk/index.js')
      patataSingleton = require(patataPath)
    }

    return patataSingleton
  }

  return {get}
}
