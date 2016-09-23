'use strict'

module.exports = function (dep) {
  const get = function () {
    const { http } = dep

    return new Promise((resolve, reject) => {
      http.get({
        hostname: 'registry.npmjs.org',
        port: 80,
        path: '/patata',
        agent: false
      }, (response) => {
        var body = ''
        response.on('data', function (d) {
          body += d
        })
        response.on('end', function () {
          try {
            // Data reception is done, do whatever with it!
            const versions = JSON.parse(body).versions
            const nrVersion = Object.keys(versions).length
            const latest = Object.keys(versions)[nrVersion - 1]
            resolve(latest)
          } catch (ex) {
            reject(ex)
          }
        })
      })
    })
  }

  return {get}
}
