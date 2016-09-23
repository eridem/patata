'use strict'

module.exports = function (dep) {
  const get = function () {
    const { process, join } = dep
    return join(process.cwd(), '/patatafile.js')
  }

  return {get}
}
