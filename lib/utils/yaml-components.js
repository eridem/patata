'use strict'

const path = require('path')
const yaml = require('js-yaml')
const chai = require("chai");
const should = chai.should();

const map = {
  id: 'elementById',
  contentDescription: 'elementByName',
  name: 'elementByName',
  xPath: 'elementByXPath',
  className: 'elementByClassName'
}

function getComponents (opts) {
  const { patata, platform } = opts
  var commonPath = path.join(process.cwd(), `/components/${platform}/ui.${platform}.yml`)
  var yamlContent = cat(commonPath)
  var components = yaml.safeLoad(yamlContent) || {}
  return components
}

function mapToPatata (opts) {
  const { patata, platform } = opts
  const components = getComponents(opts)

  for (var name in components) {
    let method = map[Object.keys(components[name])[0]];
    let value = components[name][Object.keys(components[name])[0]]
    if (!method) throw new Error(`Component "${name}" accessibility does not exists: ${components[name][0]}. E.g. "id", "contentDescription", "name", ...`)

    patata.components({
      [name]: function() { this[method](value).should.eventually.exist }
    })
  }
}

module.exports = { mapToPatata, getComponents }
