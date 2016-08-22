'use strict'

module.exports = function (argv, log, exampleFolder) {
  log.log('Running...')

  return new Promise((resolve, reject) => {
    try {
      const path = require('path')
      require('shelljs/global')

      // ANDROID_HOME for Android
      if (argv.runAndroid !== '' && !process.env.ANDROID_HOME) {
        return reject('You must setup ANDROID_HOME environment variable pointing to the Android SDK path: https://developer.android.com/studio/index.html#downloads')
      }

      const patata = require(path.join(__dirname, './utils/load-local-patata'))()
      const platform = runAndroid !== '' ? 'android' : 'ios'
      const binary = runAndroid !== '' ? argv.runAndroid : argv.runIos
      const tags = argv.tags
      const device = argv.device

      return require(path.join(__dirpath, `/run-${platform}`))({ resolve, reject, argv, log, patata, platform, binary, tags, device})
    } catch (ex) {
      return reject(ex)
    }
  })
}
