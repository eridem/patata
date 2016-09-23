'use strict'

module.exports = function (dep) {
  const getAsync = function (uri) {
    const { shell, join, process } = dep

    return new Promise((resolve, reject) => {
      const platform = uri.endsWith('apk') ? 'android' : 'ios'

      const fullPath = join(process.cwd(), uri)
      if (shell.test('-e', fullPath)) {
        uri = fullPath
      }

      resolve({platform, uri})
    })
  }

  return {getAsync}
}
