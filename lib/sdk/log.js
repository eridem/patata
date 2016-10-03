'use strict'
const { yellow, red, blue, green, white, gray } = require('chalk')
class Log {
  constructor () {
    this._mapTypes = {
      'verbose': 1,
      'debug': 5,
      'warning': 10
    }
    this._showType = this._mapTypes['warning']
  }
  get showType () {
    return this._showType
  }
  set showType (value) {
    this._showType = value
  }
  setShowType (type) {
    type = type || ''
    type = type.toLowerCase()
    if (this._mapTypes[type]) {
      this.showType = this._mapTypes[type]
    } else {
      this.showType = this._mapTypes['warning']
    }
  }
  getMessage (message) {
    return yellow('[Patata] ') + gray(message)
  }
  getMessageWithCustomColors (message) {
    return yellow('[Patata] ') + message
  }
  getErrorMessage (message) {
    return yellow('[Patata] ') + red(message)
  }
  getError (message) {
    return new Error('[Patata] ' + message)
  }
  verbose (message, extra = '') {
    if (this.showType <= this._mapTypes['verbose']) {
      console.log(gray('[Patata]'), gray(message), extra ? blue(extra) : '')
    }
  }
  debug (message, extra) {
    if (this.showType <= this._mapTypes['debug']) {
      console.log(blue('[Patata]'), gray(message), extra ? green(extra) : '')
    }
  }
  warning (message, extra) {
    if (this.showType <= this._mapTypes['warning']) {
      console.log(yellow('[Patata]'), gray(message), extra ? blue(extra) : '')
    }
  }
  always (message, extra) {
    console.log(white('[Patata]'), yellow(message), extra ? blue(extra) : '')
  }
}
exports.Log = Log
