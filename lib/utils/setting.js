/* global cat */
'use strict'

require('shelljs/global')
const yaml = require('js-yaml')
const fs = require('fs')

module.exports = function (opts) {
  const { log, help, validation } = opts
  const patataSettingsPath = validation.patataSettingsPath
  return {
    get: () => {
      if (!validation.isPatataRootDir(opts)) {
        help.errorDueRootPath(opts)
      }

      var yamlContent = cat(patataSettingsPath)
      var config = yaml.safeLoad(yamlContent) || {}
      return config
    },
    set: (obj) => {
      if (!validation.isPatataRootDir(opts)) {
        help.errorDueRootPath(opts)
      }

      log.log(`Saving changes in ${patataSettingsPath}`)
      let yamlContent = yaml.safeDump(obj)
      fs.writeFileSync(patataSettingsPath, yamlContent)
    }
  }
}
