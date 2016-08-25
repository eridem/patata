'use strict'

module.exports = function (opts) {
  const {argv, log, resolve, reject, platform, possibleArguments} = opts
  const path = require('path')
  const yaml = require('js-yaml')
  const helpText = require(path.join(__dirname, '/utils/help-text.js'))
  const yamlComponents = require(path.join(__dirname, '/utils/yaml-components.js'))
  const commonPath = path.join(process.cwd(), `/components/${platform}/ui.${platform}.yml`)

  require('shelljs/global')

  // Only one argument is required. More than one is ambiguous
  if (Object.keys(possibleArguments).filter((i => possibleArguments[i] && possibleArguments[i].length)).length !== 1) {
    return reject(helpText.contentCommonArgumentsError)
  }

  var components = yamlComponents.getComponents(opts)

  components[argv[`component-${platform}`]] = {}
  for (let attr in possibleArguments) {
    let arg = possibleArguments[attr]
    if (arg) {
      components[argv[`component-${platform}`]][attr] = arg
    }
  }

  echo(yaml.safeDump(components)).to(commonPath)
  resolve()
}
