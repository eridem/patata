'use strict'
module.exports = function (dep) {
  const changeCase = require('change-case')
  const latinize = require('latinize')

  const configDirPath = function () {
    const { join, process } = dep
    return join(process.cwd(), '/config')
  }

  const configPath = function () {
    const { join } = dep

    return join(configDirPath(), '/config.yml')
  }

  const formatName = (text) => {
    return changeCase.paramCase(latinize(text || ''))
  }

  const formatTag = (text) => {
    return '@' + changeCase.snakeCase(latinize(text || ''))
  }

  const formatTitle = (text) => {
    return changeCase.sentenceCase(text || '')
  }

  const patataSettingsPath = function () {
    const { join, process } = dep
    return join(process.cwd(), 'patata.yml')
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
    formatTag,
    formatTitle,
    isPatataRootDir
  }
}
