'use strict'

module.exports = function (opts) {
  const { resolve, reject, argv, log, patata, platform, binary, tags, device } = opts

  try {
    let provider = require('load-provider')(opts)

    const suite = {
      capability: 'android',
      components: ['components/ui.android.js', 'components/ui.common.js'],
      include: ['features/set_01'],
      features: {
        files: ['features/**/*.android.js']
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
