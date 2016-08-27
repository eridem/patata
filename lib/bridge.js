'use strict'

const path = require('path')
const asciify = require('asciify')

module.exports = function (opts) {
  opts.appium = path.join(__dirname, '/utils/appium')(opts)
  opts.cucumber = path.join(__dirname, '/utils/cucumber')(opts)
  const { reject, resolve, log, suiteName, patata, appium, cucumber } = opts

  // Logo
  const printLogo = () => {
    return new Promise((resolve, reject) => {
      try {
        asciify('PATATA', { color: 'yellow' }, function (res) {
          log.always('Time for...\n'.yellow + res.yellow + '...and happy testing.\n'.yellow)
          resolve()
        })
      } catch (ex) {
        reject(ex)
      }
    })
  }

  // On hard exists
  const onNormalHardExit = () => {
    appium.stop()
    return resolve()
  }
  const onErrorHardExit = (message) => {
    appium.stop()
    return reject(message)
  }
  // do something when app is closing
  process.on('exit', onNormalHardExit.bind(null, { cleanup: true }))
  // catches ctrl+c event
  process.on('SIGINT', onNormalHardExit.bind(null, { exit: true }))
  // catches uncaught exceptions
  process.on('uncaughtException', onNormalHardExit.bind(null, { exit: true }))

  printLogo().then(function () {
    // Current suite
    var currentSuite = patata.getSuite(suiteName)
    // Init suite
    patata.init(suiteName)
    // Create cucumber args
    var cucumberArgs = cucumber.createArgs(patata)
    // Start appium
    appium.start(currentSuite).then(function () {
      // Start cucumber
      cucumber.start(cucumberArgs)
    }).catch(function (error) {
      onErrorHardExit(error)
    })
  }).catch(function (error) {
    onErrorHardExit(error)
  })
}
