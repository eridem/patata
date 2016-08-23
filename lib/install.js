'use strict'

module.exports = function (opts, log, exampleFolder) {
  log.log('Installing...')

  return new Promise((resolve, reject) => {
    try {
      const path = require('path')
      const helpText = require(path.join(__dirname, '/utils/help-text.js'))
      require('shelljs/global')

      if (!process.env.JAVA_HOME) {
        return reject(helpText.jdk)
      }

      if (exec('npm install').code !== 0) {
        return reject('There was a problem installing.')
      } else {
        return resolve()
      }
    } catch (ex) {
      reject(ex)
    }
  })
}
