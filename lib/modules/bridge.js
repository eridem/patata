'use strict'

module.exports = function (dep) {
  const attach = function (argv, patata, onDone, suiteName, platform, report) {
    const { log, componentsProvider, appium, cucumber, asciify } = dep

    // Logo
    const printLogo = () => {
      return new Promise((resolve, reject) => {
        try {
          asciify('PATATA', { color: 'yellow' }, function (err, res) {
            if (err) reject(err)
            log.log('Now it is time for...\n'.yellow + res.yellow + '...and happy testing.\n'.yellow)
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
    }
    const onErrorHardExit = (message) => {
      appium.stop()
      console.err(message)
      onDone(false)
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
      // Attach components
      componentsProvider.mapToPatata(patata, platform)
      // Start appium
      appium.start(currentSuite.servers[0]).then(function () {
        // Start cucumber
        cucumber.start(onDone, report)
      }).catch(function (error) {
        onErrorHardExit(error)
      })
    }).catch(function (error) {
      onErrorHardExit(error)
    })
  }

  return {attach}
}
