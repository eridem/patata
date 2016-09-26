'use strict'

module.exports = function (dep) {
  const getAsync = function (uri) {
    return new Promise((resolve, reject) => {
      const platform = uri.endsWith('apk') ? 'android' : 'ios'
      resolve({platform, binary: uri})
    })
  }
  return {getAsync}
}
