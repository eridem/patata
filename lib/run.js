'use strict'

module.exports = function (opts) {
  const {log, platform} = opts
  log.log('Running...')

  return new Promise((resolve, reject) => {
    try {
      const path = require('path')
      opts.patata = require(path.join(__dirname, './utils/load-local-patata'))()

      if (!platform.hasOne()) {
        return reject(`You must choose only one platform. Current: "${platform.get()}"`)
      }
      const platformToTest = platform.get()[0]

      return require(path.join(__dirname, `/run-${platformToTest}`))(opts)
    } catch (ex) {
      return reject(ex)
    }
  })
}
