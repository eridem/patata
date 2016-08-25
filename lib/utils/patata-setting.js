'use strict'

require('shelljs/global')
const path = require('path')
const filePath = path.join(process.cwd(), '/.patata.yml')
const helpText = require(path.join(__dirname, '/help-text.js'))
const yaml = require('js-yaml')
const fs = require('fs')

module.exports = {
  get: () => {
    if (!test('-e', filePath)) {
      throw new Error(helpText.notOnRootOrPatataConfigDoesNotExists)
    }
    var yamlContent = cat(filePath)
    var config = yaml.safeLoad(yamlContent) || {}

    return config
  },
  set: (opts, obj) => {
    let { log } = opts
    if (!test('-e', filePath)) {
      throw new Error(helpText.notOnRootOrPatataConfigDoesNotExists)
    }

    log.log(`Saving changes in ${filePath}`)
    let yamlContent = yaml.safeDump(obj)
    fs.writeFileSync(filePath, yamlContent)
  }
}
