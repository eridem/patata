/* global cat */
'use strict'

require('shelljs/global')
const yaml = require('js-yaml')
const fs = require('fs')

module.exports = function (opts) {
  const { log, help, validation } = opts
  const patataConfigPath = validation.patataConfigPath
  return {
    get: () => {
      if (!validation.isPatataRootDir(opts)) {
        help.errorDueRootPath(opts)
      }

      var yamlContent = cat(patataConfigPath)
      var config = yaml.safeLoad(yamlContent) || {}
      return config
    },
    set: (obj) => {
      if (!validation.isPatataRootDir(opts)) {
        help.errorDueRootPath(opts)
      }

      log.log(`Saving changes in ${patataConfigPath}`)
      let yamlContent = yaml.safeDump(obj)
      fs.writeFileSync(patataConfigPath, yamlContent)
    }
  }
}
