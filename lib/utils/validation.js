/* global test */

'use strict'
const path = require('path')
const patataConfigPath = path.join(process.cwd(), '.patata.yml')

const formatKey = (text = '') => {
  text = text || ''
  return text.trim()
}

const formatName = (text = '') => {
  text = text || ''
  return text.toLowerCase()
    .replace(/\s|_/gi, '-')
    .replace(new RegExp(`[^A-Z0-9\\-]`, 'gi'), '')
    .replace(new RegExp(`^\\-*|\\-*$`, 'gi'), '')
    .replace(new RegExp(`--`, 'gi'), '-')
}
const formatParameter = (text = '') => {
  text = text || ''
  return text.toUpperCase()
    .replace(/\s|-/gi, '_')
    .replace(new RegExp(`[^A-Z0-9\\_]`, 'gi'), '')
    .replace(new RegExp(`^\\_*|\\_*$`, 'gi'), '')
    .replace(new RegExp(`__`, 'gi'), '_')
}

const _hasName = (opts, parser) => {
  const { argv } = opts
  let name = argv.name || ''
  name = parser(name)
  return name.length !== 0
}

const hasKey = (opts) => {
  const { argv } = opts
  let name = argv.name || ''
  return name.trim().match(/[^a-z\.]/gi) === null &&
    name.trim().replace(/\./, '') !== '' &&
    name.trim().match(/^[\.]+|[\.]+$/gi) === null
}

const hasName = (opts) => {
  return _hasName(opts, formatName)
}
const hasNameParameter = (opts) => {
  return _hasName(opts, formatParameter)
}
const hasComponentArgs = (opts) => {
  const { argv, platform } = opts

  const hasName = formatParameter(argv.name) !== ''
  const hasKey = formatParameter(argv.key) !== ''
  const hasValue = formatKey(argv.value) !== ''
  const hasPlatformCheck = platform.hasAny()
  return hasName && hasKey && hasValue && hasPlatformCheck
}

const isPatataRootDir = (opts) => {
  return test('-e', patataConfigPath)
}

module.exports = {
  patataConfigPath,
  formatKey,
  formatName,
  formatParameter,
  hasKey,
  hasName,
  hasNameParameter,
  hasComponentArgs,
  isPatataRootDir}
