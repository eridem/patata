'use strict'

module.exports = function (dep) {
  const get = function () {
    const { yaml, shell, validation, help } = dep
    const patataSettingsPath = validation.patataSettingsPath

    if (!validation.isPatataRootDir()) {
      help.errorDueRootPath()
    }

    var yamlContent = shell.cat(patataSettingsPath)
    var config = yaml.safeLoad(yamlContent) || {}
    return config
  }

  const set = function (obj) {
    const { yaml, fs, log, help, validation } = dep
    const patataSettingsPath = validation.patataSettingsPath

    if (!validation.isPatataRootDir(dep)) {
      help.errorDueRootPath(dep)
    }

    log.log(`Saving changes in ${patataSettingsPath}`)
    let yamlContent = yaml.safeDump(obj)
    fs.writeFileSync(patataSettingsPath, yamlContent)
  }

  return {get, set}
}
