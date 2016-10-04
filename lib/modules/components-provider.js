'use strict'

const map = {
  'android': {
    id: 'elementById',
    'content-description': 'elementByAccessibilityId',
    xpath: 'elementByXPath'
  },
  'ios': {
    id: 'elementById',
    name: 'elementByName',
    xpath: 'elementByXPath',
    'class-name': 'elementByClassName'
  },
  'common': {
    id: 'elementById',
    'content-description': 'elementByName',
    name: 'elementByName',
    xpath: 'elementByXPath',
    'class-name': 'elementByClassName'
  }
}

module.exports = function (dep) {
  const applyCwd = function (path) {
    const { resolve, process } = dep
    return resolve(process.cwd(), path)
  }

  const getYmlPaths = (platform) => {
    const { glob, log } = dep

    let includeFiles = glob
      .sync(`components/**/*.common.yml`)
      .concat(glob.sync(`components/**/*.${platform}.yml`))
      .map(applyCwd)

    log.debug('Component files:', includeFiles.toString())

    return includeFiles
  }

  const getYamlComponents = function (platform) {
    const { yaml, shell, extend } = dep

    let components = {}
    getYmlPaths(platform).forEach((filePath) => {
      const yamlContent = shell.cat(filePath)
      components = extend(components, yaml.safeLoad(yamlContent) || {})
    })

    return components
  }

  const mapYaml = function (patata, platform, components) {
    const { log } = dep
    log.debug('Mapping YAML components...')

    for (var name in components) {
      let method = map[platform][Object.keys(components[name])[0]]
      let value = components[name][Object.keys(components[name])[0]]
      if (!method) throw new Error(`Component "${name}" accessibility does not exists: ${components[name][0]}. E.g. "id", "contentDescription", "name", ...`)

      patata.components({
        [name]: function () { return this[method](value).should.eventually.exist }
      })
    }
  }

  const getJsPaths = (platform) => {
    const { glob, log } = dep

    let includeFiles = glob
      .sync(`components/**/*.common.js`)
      .concat(glob.sync(`components/**/*.${platform}.js`))
      .map(applyCwd)

    log.debug('Component files:', includeFiles.toString())

    return includeFiles
  }

  const getJsComponents = function (platform) {
    const { extend } = dep

    let components = {}
    getJsPaths(platform).forEach((filePath) => {
      const content = require(filePath)
      components = extend(components, content || {})
    })

    return components
  }

  const mapJs = function (patata, components) {
    const { log } = dep
    log.debug('Mapping JS components...')

    for (var name in components) {
      patata.components({[name]: components[name]})
    }
  }

  const mapToPatata = function (patata, platform) {
    const yamlComponents = getYamlComponents(platform)
    mapYaml(patata, platform, yamlComponents)

    const jsComponents = getJsComponents(platform)
    mapJs(patata, jsComponents)
  }

  return {mapToPatata}
}
