'use strict'

module.exports = function (argv, log, exampleFolder) {
  return new Promise((resolve, reject) => {
    const platform = argv.ios ? 'ios' : argv.android ? 'android' : argv.common ? 'common' : null
    const path = require('path')
    const helpText = require(path.join(__dirname, '/utils/help-text.js'))
    const componentsProvider = require(path.join(__dirname, '/utils/components-provider.js'))
    const accessibility = componentsProvider.accessibility

    const fetchMethods = Object.keys(accessibility[platform])
    const component = argv.component
    const byKey = argv.by[0].toLowerCase()
    const byValue = argv.by[1]

    log.log(`[${platform}]`, `Creating component "${component}" accessed by "${byKey}": ${byValue}`)

    const keyExists = fetchMethods.indexOf(byKey) === -1 ? false : true
    if (!keyExists) {
      return reject(helpText.contentCommonArgumentsError(byKey, fetchMethods))
    }

    var components = componentsProvider.getComponents({platform, log})
    components[component] = {}
    components[component][byKey] = byValue
    componentsProvider.setComponents({platform, log}, components)

    resolve()
  })
}
