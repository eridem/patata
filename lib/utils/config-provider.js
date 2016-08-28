/* global test, mkdir, touch, cat */
'use strict'

const yaml = require('js-yaml')
const extend = require('util')._extend

function validate (opts) {
  const {help, validation} = opts
  if (!test('-e', validation.configPath)) {
    help.warningDueConfigNotExists(opts, validation.configPath)
    mkdir('-p', validation.configDirPath)
    touch(validation.configPath)
  }
}

module.exports = function (opts) {
  const {validation} = opts

  const get = (tags) => {
    validate(opts)
    tags = tags instanceof Array ? tags : []
    const yamlContent = cat(validation.configPath)
    const configWithTags = yaml.safeLoad(yamlContent) || {}
    let config = {}
    tags.forEach((tag) => {
      if (configWithTags[tag]) {
        config = extend(config, configWithTags[tag])
      }
    })

    return config
  }

  return {get}
}
