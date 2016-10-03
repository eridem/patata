'use strict'
class WebDriver {
  constructor (patata) {
    this._desired = patata.capability
    this.buildDriverChain()
    this.setUpServers(patata.servers)
    return this
  }
  start (binary) {
    this._desired.app = binary
        // Init driver
    return this.driver
            .init(this._desired)
            .setImplicitWaitTimeout(45 * 1000)
  }
  quit () {
    this.driver
            .close()
            .quit()
    return this
  }
  get driver () {
    return this._driver
  }
  get appiumMsgQueue () {
    if (!this._appiumMsgQueue) {
      this._appiumMsgQueue = []
    }
    return this._appiumMsgQueue
  }
  buildDriverChain () {
    require('chai-as-promised').transferPromiseness = require('wd').transferPromiseness
  }
  setUpServers (servers) {
    for (var attr in servers) {
      var serverConfig = servers[attr]
      this._driver = require('wd').promiseChainRemote(serverConfig)
    }
  }
  registerReports (report) {
    let that = this
    this.driver.on('status', function (info) {
      that.appiumMsgQueue.push({ status: 'status', info: info })
      report.forEach(report => {
        if (typeof report.fromEmulator === 'function') {
          report.fromEmulator('status', info, '', '')
        }
      })
    })
    this.driver.on('command', function (meth, path, data) {
      that.appiumMsgQueue.push({ status: 'command', meth: meth, path: path, data: data || '' })
      report.forEach(report => {
        if (typeof report.fromEmulator === 'function') {
          report.fromEmulator('command', meth, path, data || '')
        }
      })
    })
    this.driver.on('http', function (meth, path, data) {
      that.appiumMsgQueue.push({ status: 'http', meth: meth, path: path, data: data || '' })
      report.forEach(report => {
        if (typeof report.fromEmulator === 'function') {
          report.fromEmulator('http', meth, path, data || '')
        }
      })
    })
    return this
  }
}
exports.WebDriver = WebDriver
