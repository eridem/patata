'use strict'

const path = require('path')
const extend = require('util')._extend

module.exports = function (opts) {
  const {log} = opts
  let appiumApp
  const stop = () => {
    if (appiumApp && typeof appiumApp.exit === 'function') {
      log.warn(['Stopping Appium...'])
      appiumApp.exit()
      log.warn(['Appium stopped...'])
    }
  }
  const start = (server) => {
    var appiumArgs = require(path.join(process.cwd(), '/node_modules/appium/build/lib/parser')).getDefaultArgs()
    appiumArgs.address = server.address
    appiumArgs.port = server.port
    appiumArgs.debugLogSpacing = true
    appiumArgs.loglevel = 'warning'
    server = extend(appiumArgs, server)
    require(path.join(process.cwd(), '/node_modules/appium/build/lib/main')).main(appiumArgs)

    return new Promise((resolve, reject) => {
      setTimeout(resolve, 5000)
    })
  }

  return { stop, start }
}
