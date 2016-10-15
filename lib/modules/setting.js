'use strict'

module.exports = function (dep) {
  const storagePath = function () {
    const { join, process } = dep
    return join(process.cwd(), 'patata.yml')
  }

  const get = function () {
    const { yaml, shell, validation, help } = dep
    const path = path()

    if (!validation.isPatataRootDir()) {
      help.errorDueRootPath()
    }

    var yamlContent = shell.cat(path)
    var config = yaml.safeLoad(yamlContent) || {}
    return config
  }

  const set = function (obj) {
    const { yaml, fs, log, help, validation } = dep
    const path = storagePath()

    if (!validation.isPatataRootDir(dep)) {
      help.errorDueRootPath(dep)
    }

    log.log(`Saving changes in ${path}`)
    let yamlContent = yaml.safeDump(obj)
    fs.writeFileSync(path, yamlContent)
  }

  return {get, set, storagePath}
}
