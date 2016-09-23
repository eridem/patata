'use strict'

module.exports = function (dep) {
  let patataSingleton

  const get = function () {
    if (!patataSingleton) {
      const { join, process, shell } = dep
      const patataPath = join(process.cwd(), '/node_modules/patata/dist/index.js')

      // Check if Patata is installed locally
      if (!shell.test('-e', patataPath)) {
        throw new Error('Patata not installed or you are not in the project directory. Go to the root project directory and run "patata install"')
      }

      patataSingleton = require(patataPath)
    }

    return patataSingleton
  }

  return {get}
}
