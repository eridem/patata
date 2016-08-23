'use strict'

module.exports = function (opts) {
  require('shelljs/global')
  const Rulet = require('rulet')
  const path = require('path')
  const glob = require('glob')
  const patataConfigPath = path.join(process.cwd(), '/patata.json')
  const { resolve, reject, argv, log, patata, platform, binary, tags, device } = opts
  const helpText = require(path.join(__dirname, '/utils/help-text.js'))

  // ANDROID_HOME for Android
  if (argv.runAndroid !== '' && !process.env.ANDROID_HOME) {
    return reject(helpText.androidHome)
  }

  try {
    let provider = require(path.join(__dirname, '/utils/load-provider'))(opts)

    let includeFiles = glob.sync(`features/**/*.${platform}.js`)
    let componentFiles = [
      `components/ui.${platform}.js`,
      `components/ui.common.js`]
    let featureFiles = glob.sync(`/features/**/*.feature`)
    let configFile = path.join(process.cwd(), '/config/config.js')
    let tags = (opts.tags || '') + `,@${platform}`
    let tagsArray = []

    let extractTagsRegExp = /@([\w]+)/gi
    var match = extractTagsRegExp.exec(tags)
    while (match != null) {
      tagsArray.push(match[1])
      match = extractTagsRegExp.exec(tags)
    }

    const rawConfigFile = require(configFile)
    const rulet = new Rulet(rawConfigFile, tagsArray)
    const config = rulet.getConfiguration()

    const suite = {
      capability: 'android',
      components: componentFiles,
      include: includeFiles,
      features: {
        tags: [tags] || []
      },
      provider: provider,
      reports: [
        {
          package: 'json',
          path: path.join(process.cwd(), '/reports', patata.fileUtils.generateResultsFilePath('json'))
        }
      ],
      config: config
    }

    patata.suite('run', suite)
    patata.cli('run', patata, resolve, reject)
  } catch (ex) {
    reject(ex)
  }
}
