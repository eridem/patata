'use strict'

require('shelljs/global')
const path = require('path')
const yaml = require('js-yaml')
const chai = require('chai')
const should = chai.should()
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
  const { platform } = opts
  return path.join(process.cwd(), `/components/ui.${platform}.yml`)
}

function getComponents (opts) {
  const { patata, platform } = opts
  const filePath = getPath(opts)
  const yamlContent = cat(filePath)
  const components = yaml.safeLoad(yamlContent) || {}
  return components
}

function setComponents (opts, obj) {
  let {platform, log} = opts
  const filePath = getPath(opts)
  const yamlContent = yaml.safeDump(obj)
  opts.log.log(`[${platform}]`, `Saving changes in "${filePath}"`)
  fs.writeFileSync(filePath, yamlContent)
}

function mapToPatata (opts) {
  const { patata, platform } = opts
  const components = getComponents(opts)

  for (var name in components) {
    let method = map[platform][Object.keys(components[name])[0]]
    let value = components[name][Object.keys(components[name])[0]]
    if (!method) throw new Error(`Component "${name}" accessibility does not exists: ${components[name][0]}. E.g. "id", "contentDescription", "name", ...`)

    patata.components({
      [name]: function () { this[method](value).should.eventually.exist }
    })
  }
}

module.exports = { accessibility: map, mapToPatata, getComponents, setComponents}
