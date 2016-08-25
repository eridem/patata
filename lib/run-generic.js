'use strict'

module.exports = function (opts) {
  require('shelljs/global')
  const Rulet = require('rulet')
  const path = require('path')
  const glob = require('glob')
  const { resolve, reject, argv, log, patata, platform, binary, tags, device } = opts
  const helpText = require(path.join(__dirname, '/utils/help-text.js'))

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

    const reportDirPath = path.join(process.cwd(), '/reports/', patata.fileUtils.generateResultsFilePath('json')).replace('.json', '')
    mkdir('-p', reportDirPath)
    const reportPath = path.join(reportDirPath, '/reports/', patata.fileUtils.generateResultsFilePath('json'))
    const reportFiles = glob.sync(`${reportDirPath}/**/*`)

    const suite = {
      capability: platform,
      components: componentFiles,
      include: includeFiles,
      features: {
        tags: [tags] || []
      },
      provider: provider,
      reports: [
        {
          package: 'json',
          path: reportPath
        }
      ],
      config: config
    }

    let onDoneArg = opts.argv.onDone
    let onDoneFn = null
    if (onDoneArg) {
      if (onDoneArg.startsWith('/')) {
        onDoneFn = require(onDoneArg)
      } else {
        onDoneFn = require(path.join(process.cwd(), onDoneArg))
      }
    }

    let onResolveWrap = () => {
      try {
        if (typeof onDoneFn === 'function') onDoneFn({argv, log, suite: patata.getSuite('run'), platform, binary, tags, device, reportFiles})
      } catch (ex) {}

      resolve()
    }
    let onRejectWrap = () => {
      try {
        if (typeof onDoneFn === 'function') onDoneFn({argv, log, suite: patata.getSuite('run'), platform, binary, tags, device, reportFiles})
      } catch (ex) {}
      reject()
    }

    patata.suite('run', suite)
    patata.cli({ suiteName: 'run', patata, resolve: onResolveWrap, reject: onRejectWrap})
  } catch (ex) {
    reject(ex)
  }
}
