'use strict'

module.exports = function (opts) {
  const {log, argv, binaryProvider} = opts
  log.log('Executing tests...')

  return new Promise((resolve, reject) => {
    try {
      const path = require('path')
      opts.patata = require(path.join(__dirname, './utils/load-local-patata'))()

      binaryProvider.getBinary().then(({platform, binary}) => {
        argv.name = binary
        argv.currentPlatform = platform
        // Check conditions for the specific platform
        require(path.join(__dirname, `/run-${platform}`))(opts)
        // Run generic
        opts.resolve = resolve
        opts.reject = reject
        return require(path.join(__dirname, '/run-generic.js'))(opts)
      }).catch(reject)
    } catch (ex) {
      return reject(ex)
    }
  })
}
