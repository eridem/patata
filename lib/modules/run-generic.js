'use strict'

module.exports = function (dep) {
  const start = function (argv, binary, platform, device) {
    const { glob, shell, log, configProvider, bridge, portProvider, process, join } = dep
    const patata = dep.patata.get()

    // Implementation files
    let includeFiles = glob
      .sync(`features/**/*.common.js`)
      .concat(glob.sync(`features/**/*.${platform}.js`))

    // Component files
    let componentCommonJsPath = join(process.cwd(), 'components/ui.common.js')
    let componentPlatformJsPath = join(process.cwd(), `components/ui.${platform}.js`)
    let componentFiles = []

    if (shell.test('-e', componentCommonJsPath)) {
      componentFiles.push(componentCommonJsPath)
    }
    if (shell.test('-e', componentPlatformJsPath)) {
      componentFiles.push(componentPlatformJsPath)
    }

    // Fix tags
    let tags = argv.tags || ''
    tags = typeof tags === 'string' ? [tags] : tags

    // Tags for config
    let configTagsToParse = argv.configTags ? [argv.configTags] : tags
    let configTagsArray = []

    let extractTagsRegExp = /@([\w]+)/gi
    configTagsToParse.forEach((tags) => {
      var match = extractTagsRegExp.exec(tags)
      while (match != null) {
        configTagsArray.push(match[1])
        match = extractTagsRegExp.exec(tags)
      }
    })

    let config = configProvider.get(configTagsArray)

    // Reports
    const reportDirPath = join(process.cwd(), '/reports/', patata.fileUtils.generateResultsFilePath('json')).replace('.json', '')
    shell.mkdir('-p', reportDirPath)
    const reportPath = join(reportDirPath, patata.fileUtils.generateResultsFilePath('json'))

    // Capability and Device
    let capability = { template: platform, append: {} }
    if (device) {
      capability.append.udid = device
    }

    log.debug('Capabilities', JSON.stringify(capability))

    portProvider.get().then((port) => {
      // Virtual suite
      dep.suite = {
        capability: capability,
        components: componentFiles,
        include: includeFiles,
        features: {
          tags: tags
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
          onDonePath = join(process.cwd(), onDoneArg)
        }
        onDoneFn = require(onDonePath)
        log.log(`[Trigger]`, onDonePath)
      }

      const onDone = (success) => {
        try {
          if (typeof onDoneFn === 'function') {
            let {yargs} = dep
            let triggerOpts = {argv: yargs.argv, success}
            onDoneFn(triggerOpts)
          }
          if (success) {
            log.log('Everything alright! Happy testing!')
          } else {
            log.warn('Finished with errors. Do not give up and cheer up!')
          }
        } catch (ex) {
          log.warn('Finished with errors. Do not give up and cheer up!')
        } finally {
          process.exit(success ? 0 : 1)
        }
      }

      let suiteName = 'run'
      patata.suite(suiteName, dep.suite)
      bridge.attach(argv, patata, onDone, suiteName, platform)
    }).catch(function (err) {
      log.exit(err)
    })
  }

  return {start}
}
