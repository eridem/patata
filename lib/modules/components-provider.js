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
  const getPath = (platform) => {
    const { join, process } = dep
    return join(process.cwd(), `/components/ui.${platform}.yml`)
  }

  const getComponents = function (platform) {
    const { yaml, shell } = dep

    const filePath = getPath(platform)
    const yamlContent = shell.cat(filePath)
    const components = yaml.safeLoad(yamlContent) || {}
    return components
  }

  const mapToPatata = function (patata, platform) {
    const components = getComponents(platform)

    for (var name in components) {
      let method = map[platform][Object.keys(components[name])[0]]
      let value = components[name][Object.keys(components[name])[0]]
      if (!method) throw new Error(`Component "${name}" accessibility does not exists: ${components[name][0]}. E.g. "id", "contentDescription", "name", ...`)

      patata.components({
        [name]: function () { return this[method](value).should.eventually.exist }
      })
    }
  }

  return {mapToPatata}
}
