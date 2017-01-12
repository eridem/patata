'use strict'
const patata = require('../../sdk/index')
module.exports = function () {
  // Before
  this.Before(function (scenario) {
    return patata.start(this, scenario)
  })

  // After
  this.After(function (scenario) {
    let appiumMsg = patata.emulator.appiumMsgQueue.slice(0)
    scenario.attach('[APPIUM LOG]')
    appiumMsg.forEach(msg => {
      scenario.attach(`${msg.status}: ${msg.meth}${msg.path ? '\n' + msg.path : ''}${msg.data ? '\n' + msg.data : ''}\n--------`)
    })
    scenario.attach('[/APPIUM LOG]')
    patata.emulator.appiumMsgQueue.length = 0

    return patata.emulator.driver.takeScreenshot().then((screenShot) => {
      return scenario.attach(new Buffer(screenShot, 'base64'), 'image/png')
    }).then(() => {
      this.emu.resetApp()
    })
  })

  // Timeouts
  this.setDefaultTimeout(45 * 1000)
}
