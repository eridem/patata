/* global test */
'use strict'

const url = require('url')
const path = require('path')

module.exports = function (opts) {
  const { log, argv } = opts

  const getBinary = () => {
    const parsedUrl = url.parse(argv.name)
    const protocol = parsedUrl.protocol ? parsedUrl.protocol.replace(/:/gi, '') : 'file'
    const providerPath = path.join(__dirname, `binary-provider.${protocol}.js`)
    if (test('-e', providerPath)) {
      return require(providerPath)(opts)
    } else {
      log.exit(`Cannot understand protocol for "${argv.name}"`)
    }
  }

  return {getBinary}
}
