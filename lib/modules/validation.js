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

  const formatKey = (text = '') => {
    text = text || ''
    return text.trim()
  }

  const formatName = (text = '') => {
    text = text || ''
    return text.toLowerCase()
      .replace(/\s|_/gi, '-')
      .replace(new RegExp('[^A-Z0-9\\-]', 'gi'), '')
      .replace(new RegExp('^\\-*|\\-*$', 'gi'), '')
      .replace(new RegExp('--', 'gi'), '-')
  }
  const formatParameter = (text = '') => {
    text = text || ''
    return text.toUpperCase()
      .replace(/\s|-/gi, '_')
      .replace(new RegExp('[^A-Z0-9\\_]', 'gi'), '')
      .replace(new RegExp('^\\_*|\\_*$', 'gi'), '')
      .replace(new RegExp('__', 'gi'), '_')
  }

  const _hasName = (parser) => {
    const { argv } = dep
    let name = argv.name || ''
    name = parser(name)
    return name.length !== 0
  }

  const hasKey = () => {
    const { argv } = dep
    let name = argv.name || ''
    return name.trim().match(/[^a-z\.]/gi) === null &&
      name.trim().replace(/\./, '') !== '' &&
      name.trim().match(/^[\.]+|[\.]+$/gi) === null
  }

  const hasName = () => {
    return _hasName(formatName)
  }
  const hasNameParameter = () => {
    return _hasName(formatParameter)
  }
  const hasComponentArgs = () => {
    const { argv, platform } = dep

    const hasName = formatParameter(argv.name) !== ''
    const hasKey = formatParameter(argv.key) !== ''
    const hasValue = formatKey(argv.value) !== ''
    const hasPlatformCheck = platform.hasAny()
    return hasName && hasKey && hasValue && hasPlatformCheck
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
    formatKey,
    formatName,
    formatParameter,
    hasKey,
    hasName,
    hasNameParameter,
    hasComponentArgs,
    isPatataRootDir}
}
