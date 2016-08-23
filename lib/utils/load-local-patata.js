'use strict'

module.exports = function () {
  const path = require('path')
  const patataPath = path.join(process.cwd(), '/node_modules/patata/dist/index.js')

  // Check if Patata is installed locally
  if (!test('-e', patataPath)) {
    throw new Error('Patata not installed or you are not in the project directory. Go to the root project directory and run "patata --install"')
  }

  return require(patataPath)
}
