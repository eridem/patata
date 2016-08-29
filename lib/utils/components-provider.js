/* global cat */

'use strict'

const path = require('path')
const yaml = require('js-yaml')
const fs = require('fs')

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

module.exports = (opts) => {
  const getPath = () => {
    const { argv } = opts
    return path.join(process.cwd(), `/components/ui.${argv.currentPlatform}.yml`)
  }

  const getComponents = () => {
    const filePath = getPath()
    const yamlContent = cat(filePath)
    const components = yaml.safeLoad(yamlContent) || {}
    return components
  }

  const setComponents = (obj) => {
    let {argv, log} = opts
    const filePath = getPath()
    const yamlContent = yaml.safeDump(obj)
    log.log(`[${argv.currentPlatform}]`, `Saving changes in "${filePath}"`)
    fs.writeFileSync(filePath, yamlContent)
  }

  const mapToPatata = () => {
    const { patata, argv } = opts
    const components = getComponents()

    for (var name in components) {
      let method = map[argv.currentPlatform][Object.keys(components[name])[0]]
      let value = components[name][Object.keys(components[name])[0]]
      if (!method) throw new Error(`Component "${name}" accessibility does not exists: ${components[name][0]}. E.g. "id", "contentDescription", "name", ...`)

      patata.components({
        [name]: function () { return this[method](value).should.eventually.exist }
      })
    }
  }

  return {getComponents, setComponents, mapToPatata}
}
