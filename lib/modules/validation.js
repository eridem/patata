'use strict'
module.exports = function (dep) {
  const configDirPath = function () {
    const { join, process } = dep
    return join(process.cwd(), '/config')
  }

  const configPath = function () {
    const { join } = dep

    return join(configDirPath(), '/config.yml')
  }

  const formatName = (text = '') => {
    text = text || ''
    return text.toLowerCase()
      .replace(/\s|_/gi, '-')
      .replace(new RegExp('[^A-Z0-9\\-]', 'gi'), '')
      .replace(new RegExp('^\\-*|\\-*$', 'gi'), '')
      .replace(new RegExp('--', 'gi'), '-')
  }

  const patataSettingsPath = function () {
    const { join, process } = dep
    return join(process.cwd(), '.patata.yml')
  }

  const isPatataRootDir = () => {
    const { shell } = dep
    return shell.test('-e', patataSettingsPath())
  }

  return {
    patataSettingsPath,
    configDirPath,
    configPath,
    formatName,
    isPatataRootDir}
}
