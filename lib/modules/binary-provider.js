'use strict'

module.exports = function (dep) {
  const getBinary = function (uri) {
    const { log, url } = dep

    const parsedUrl = url.parse(uri)
    let protocol = parsedUrl.protocol ? parsedUrl.protocol.replace(/:/gi, '') : 'file'
    protocol = protocol.startsWith('http') ? 'http' : protocol
    let provider = dep[`binary-provider-${protocol}`]

    if (provider) {
      return provider.getAsync(uri)
    } else {
      log.exit(`Cannot understand protocol for "${protocol}"`)
    }
  }

  return {getBinary}
}
