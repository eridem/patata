'use strict'

module.exports = function (opts) {
  const verify = function () {
    const { help, process } = opts

    // ANDROID_HOME for Android
    if (!process.env.ANDROID_HOME) {
      help.errorByAndroidHome()
    }
  }
  return {verify}
}
