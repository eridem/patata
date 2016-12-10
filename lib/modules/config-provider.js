'use strict'

module.exports = function (dep) {
  function validate () {
    const {help, validation, shell} = dep

    if (!shell.test('-e', validation.configPath())) {
      help.warningDueConfigNotExists(validation.configPath())
      shell.mkdir('-p', validation.configDirPath())
      shell.touch(validation.configPath())
    }
  }

  const get = (tags) => {
    const { shell, yaml, extend, validation } = dep

    validate()

    tags = tags instanceof Array ? tags : []
    const yamlContent = shell.cat(validation.configPath())
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
