'use strict'

module.exports = function (opts) {
  const { argv } = opts

  return new Promise((resolve, reject) => {
    const binary = argv.name
    const platform = binary.endsWith('apk') ? 'android' : 'ios'
    resolve({platform, binary})
  })
}
