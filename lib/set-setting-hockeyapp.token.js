'use strict'

module.exports = function (opts, log, exampleFolder) {
  log.log('HockeyApp Token...')

  return new Promise((resolve, reject) => {
    try {
      require('shelljs/global')
      const path = require('path')
      const patataConfig = require(path.join(__dirname, '/utils/patata-setting.js'))

      let patataConfigObj = patataConfig.get() || {}
      patataConfigObj.HockeyApp = { Token: opts['set-setting'][1] }

      patataConfig.set({log}, patataConfigObj)

      resolve('Value set.')
    } catch (ex) {
      reject(ex)
    }
  })
}
