'use strict'

module.exports = function (opts) {
  const { resolve, reject, argv, log, patata, platform, binary, tags, device } = opts
  const helpText = require(path.join(__dirname, '/utils/help-text.js'))

  // ANDROID_HOME for Android
  if (argv.runAndroid !== '' && !process.env.ANDROID_HOME) {
    return reject(helpText.androidHome)
  }

  try {
    let provider = require('load-provider')(opts)

    const suite = {
      capability: 'android',
      components: ['components/ui.android.js', 'components/ui.common.js'],
      include: ['features/**/*.android.js'],
      features: {
        files: ['features/**/*.feature']
      },
      provider: provider,
      reports: [
        {
          package: 'json',
          path: patata.fileUtils.generateResultsFilePath('json')
        }
      ],
      config: require('config/config.js')
    }

    patata.suite('run', suite)
    patata.cli('run', patata)
    resolve()
  } catch (ex) {
    reject(ex)
  }
}
