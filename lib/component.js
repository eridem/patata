'use strict'

function validate (opts) {
  let {validation, help, command} = opts
  if (!validation.isPatataRootDir(opts)) {
    help.errorDueRootPath(opts)
  }
  if (!validation.hasComponentArgs(opts)) {
    help.errorDueMissingArguments(opts, [`E.g. patata ${command} <reference-name> <accessibility> <accessibility-value> [--android | --ios | --common]`, `E.g. patata ${command} LOGIN_BUTTON "content-description" "login_button" --android`])
  }
}

module.exports = function (opts) {
  let {validation, argv, log, help, platform} = opts
  validate(opts)
  log.log('Creating component...')

  return new Promise((resolve, reject) => {
    platform.get().forEach((platform) => {
      opts.currentPlatform = platform
      const platformType = opts.currentPlatform
      const path = require('path')
      const componentsProvider = require(path.join(__dirname, '/utils/components-provider.js'))
      const accessibility = componentsProvider.accessibility

      const fetchMethods = Object.keys(accessibility[platformType])
      const name = validation.formatParameter(argv.name)
      const byKey = argv.key.toLowerCase()
      const byValue = argv.value

      log.log(`[${platformType}]`, `Creating component "${name}" accessed by "${byKey}": ${byValue}`)

      const keyExists = fetchMethods.indexOf(byKey) === -1
      if (!keyExists) {
        return log.warn([`[${platformType}] ${help.contentCommonArgumentsError(byKey, fetchMethods)}`])
      }

      var components = componentsProvider.getComponents(opts)
      components[name] = {}
      components[name][byKey] = byValue
      componentsProvider.setComponents(opts, components)
    })

    resolve()
  })
}
