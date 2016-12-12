'use strict'

module.exports = function (dep) {
  const verify = function () {
    const { help, process } = dep

    // ANDROID_HOME for Android
    if (!process.env.ANDROID_HOME) {
      help.errorByAndroidHome()
    }
  }
  return {verify}
}
