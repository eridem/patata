'use strict'

module.exports = function (argv, log, exampleFolder) {
  log.log('Running...')

  return new Promise((resolve, reject) => {
    try {
      const path = require('path')

      const patata = require(path.join(__dirname, './utils/load-local-patata'))()
      const platform = argv['android'] ? 'android' : 'ios'
      const binary = argv['run']
      const tags = argv.tags
      const device = argv.device

      return require(path.join(__dirname, `/run-${platform}`))({ resolve, reject, argv, log, patata, platform, binary, tags, device })
    } catch (ex) {
      return reject(ex)
    }
  })
}
