'use strict'

module.exports = function (opts) {
  const path = require('path')
  const { resolve, reject, argv, log, patata, platform, binary, tags, device } = opts
  const helpText = require(path.join(__dirname, '/utils/help-text.js'))

  // ANDROID_HOME for Android
  if (argv.runAndroid !== '' && !process.env.ANDROID_HOME) {
    return reject(helpText.androidHome)
  }

  require(path.join(__dirname, '/run-generic.js'))(opts)
}