/* global test, mkdir */
'use strict'

module.exports = function (opts) {
  const path = require('path')
  const glob = require('glob')
  const { resolve, reject, log, argv, patata, configProvider, bridge, portProvider } = opts

  try {
    const binary = argv.name
    const currentPlatform = argv.currentPlatform

    // Implementation files
    let includeFiles = glob.sync(`features/**/*.common.js`)
      .concat(glob.sync(`features/**/*.${currentPlatform}.js`))

    // Component files
    let componentCommonJsPath = path.join(process.cwd(), 'components/ui.common.js')
    let componentPlatformJsPath = path.join(process.cwd(), `components/ui.${currentPlatform}.js`)
    let componentFiles = []

    if (test('-e', componentCommonJsPath)) {
      componentFiles.push(componentCommonJsPath)
    }
    if (test('-e', componentPlatformJsPath)) {
      componentFiles.push(componentPlatformJsPath)
    }

    // Fix tags
    argv.tags = argv.tags || ''
    argv.tags = typeof argv.tags === 'string' ? [argv.tags] : argv.tags

    // Tags for config
    let configTagsToParse = argv.configTags ? [argv.configTags] : argv.tags
    let tagsArray = []

    let extractTagsRegExp = /@([\w]+)/gi
    configTagsToParse.forEach((tags) => {
      var match = extractTagsRegExp.exec(tags)
      while (match != null) {
        tagsArray.push(match[1])
        match = extractTagsRegExp.exec(tags)
      }
    })

    // Configurations
    let config = configProvider.get(tagsArray)

    // Reports
    const reportDirPath = path.join(process.cwd(), '/reports/', patata.fileUtils.generateResultsFilePath('json')).replace('.json', '')
    mkdir('-p', reportDirPath)
    const reportPath = path.join(reportDirPath, patata.fileUtils.generateResultsFilePath('json'))

    portProvider.get().then((port) => {
      // Virtual suite
      opts.suite = {
        capability: currentPlatform,
        components: componentFiles,
        include: includeFiles,
        features: {
          tags: argv.tags
        },
        provider: { path: binary },
        reports: [
          {
            package: 'json',
            path: reportPath
          }
        ],
        config: config,
        servers: [{address: 'localhost', port: port}]
      }

      let onDoneArg = argv.onDone
      let onDoneFn = null
      if (onDoneArg) {
        let onDonePath = onDoneArg
        if (!onDoneArg.startsWith('/')) {
          onDonePath = path.join(process.cwd(), onDoneArg)
        }
        onDoneFn = require(onDonePath)
        log.log(`[Trigger]`, onDonePath)
      }

      const getTrigger = (success, fn) => {
        return (args) => {
          try {
            if (typeof onDoneFn === 'function') {
              let {argv, command, suite} = opts
              let triggerOpts = {argv, command, suite, success}
              onDoneFn(triggerOpts)
            }
          } catch (ex) {}
          fn(args)
        }
      }

      opts.resolve = getTrigger(true, resolve)
      opts.reject = getTrigger(false, reject)
      opts.suiteName = 'run'
      patata.suite(opts.suiteName, opts.suite)
      bridge.attach()
    }).catch(reject)
  } catch (ex) {
    reject(ex)
  }
}
