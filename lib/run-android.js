'use strict'

module.exports = function (opts) {
  const { reject, help, argv } = opts

  // ANDROID_HOME for Android
  if (argv.runAndroid !== '' && !process.env.ANDROID_HOME) {
    return reject(help.androidHome)
  }
}
