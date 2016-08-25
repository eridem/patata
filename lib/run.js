'use strict'

module.exports = function (argv, log, exampleFolder) {
  log.log('Running...')

  return new Promise((resolve, reject) => {
    try {
      const path = require('path')

      require('shelljs/global')

      const patata = require(path.join(__dirname, './utils/load-local-patata'))()
      const platform = !argv.runIos ? 'android' : 'ios'
      const binary = platform === 'android' ? argv.runAndroid : argv.runIos
      const tags = argv.tags
      const device = argv.device

      return require(path.join(__dirname, `/run-${platform}`))({ resolve, reject, argv, log, patata, platform, binary, tags, device})
    } catch (ex) {
      return reject(ex)
    }
  })
}
