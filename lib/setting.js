/* global test */
'use strict'

const path = require('path')

function validate (opts) {
  const {validation, help} = opts
  if (!validation.isPatataRootDir(opts)) {
    help.errorDueRootPath(opts)
  }
  if (!validation.hasKey(opts)) {
    help.errorDueKey(opts)
  }
}

module.exports = function (opts) {
  let {argv, help} = opts
  validate(opts)

  const scriptPath = path.join(__dirname, `setting-${argv.name.toLowerCase()}.js`)

  if (!test('-e', scriptPath)) {
    help.errorDueNonExistingSetting(opts)
  }

  return require(scriptPath)(opts)
}
