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

function getPath (opts) {
  const { currentPlatform } = opts
  return path.join(process.cwd(), `/components/ui.${currentPlatform}.yml`)
}

function getComponents (opts) {
  const filePath = getPath(opts)
  const yamlContent = cat(filePath)
  const components = yaml.safeLoad(yamlContent) || {}
  return components
}

function setComponents (opts, obj) {
  let {currentPlatform, log} = opts
  const filePath = getPath(opts)
  const yamlContent = yaml.safeDump(obj)
  log.log(`[${currentPlatform}]`, `Saving changes in "${filePath}"`)
  fs.writeFileSync(filePath, yamlContent)
}

function mapToPatata (opts) {
  const { patata, currentPlatform } = opts
  const components = getComponents(opts)

  for (var name in components) {
    let method = map[currentPlatform][Object.keys(components[name])[0]]
    let value = components[name][Object.keys(components[name])[0]]
    if (!method) throw new Error(`Component "${name}" accessibility does not exists: ${components[name][0]}. E.g. "id", "contentDescription", "name", ...`)

    patata.components({
      [name]: function () { this[method](value).should.eventually.exist }
    })
  }
}

module.exports = { accessibility: map, mapToPatata, getComponents, setComponents }
