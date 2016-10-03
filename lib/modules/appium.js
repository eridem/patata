'use strict'

module.exports = function (dep) {
  let appiumApp

  const stop = () => {
    const { log } = dep
    if (appiumApp && typeof appiumApp.exit === 'function') {
      log.warn(['Stopping Appium...'])
      appiumApp.exit()
      log.warn(['Appium stopped...'])
    }
  }
  const start = (server) => {
    const { join, extend, yargs, __rootdirname } = dep
    const parserPath = join(__rootdirname, '/node_modules/appium/build/lib/parser')
    const mainPath = join(__rootdirname, '/node_modules/appium/build/lib/main')

    var appiumArgs = require(parserPath).getDefaultArgs()
    appiumArgs.address = server.address
    appiumArgs.port = server.port
    appiumArgs.debugLogSpacing = true
    appiumArgs.loglevel = yargs.argv.verbose ? 'debug' : 'warning'
    server = extend(appiumArgs, server)
    appiumApp = require(mainPath).main(appiumArgs)

    return new Promise((resolve, reject) => {
      setTimeout(resolve, 5000)
    })
  }

  return {stop, start}
}
