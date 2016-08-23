'use strict'

module.exports = function (opts, log, exampleFolder) {
  log.log('HockeyApp Token...')

  return new Promise((resolve, reject) => {
    try {
      require('shelljs/global')
      const path = require('path')
      const patataConfig = require(path.join(__dirname, '/utils/patata-config.js'))

      log.log(`Loading configurations...`)
      let patataConfigObj = patataConfig.get()
      patataConfigObj.hockeyapp = { token: opts.hockeyappSetToken }

      log.log(`Saving configurations...`)
      patataConfig.set(patataConfigObj)

      resolve('Value set.')
    } catch (ex) {
      reject(ex)
    }
  })
}
