'use strict'

module.exports = function (dep) {
  const getBinary = function (uri) {
    const { log, url } = dep

    const parsedUrl = url.parse(uri)
    let protocol = parsedUrl.protocol ? parsedUrl.protocol.replace(/:/gi, '') : 'file'
    protocol = protocol.startsWith('http') ? 'http' : protocol
    protocol = protocol.charAt(0).toUpperCase() + protocol.slice(1)

    let provider = dep.binaryProvider[`binaryProvider${protocol}`]

    if (provider) {
      return provider.getAsync(uri)
    } else {
      log.exit(`Cannot understand protocol for "${protocol}"`)
    }
  }

  return {getBinary}
}
