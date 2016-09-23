'use strict'
module.exports = function (dep) {
  const get = () => {
    const { net } = dep
    return new Promise((resolve, reject) => {
      try {
        let server = net.createServer()
        server.unref()
        server.on('error', reject)
        server.listen(0, () => {
          let port = server.address().port
          server.close(() => {
            resolve(port)
          })
        })
      } catch (ex) {
        reject(ex)
      }
    })
  }

  return {get}
}
