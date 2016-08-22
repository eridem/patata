'use strict'

module.exports = function (argv, log, exampleFolder) {
  log.log(`Runnning the "${argv.suite}" suite...`)

  return new Promise((resolve, reject) => {
    try {
      const path = require('path')
      const patatafile = require(path.join(__dirname, 'utils/get-patatafile'))()
      require('shelljs/global')

      if (!test('-e', patatafile)) {
        return reject('"patatafile.js" must exists and you must be on the root of the project to run this command.')
      }

      const patata = require(path.join(__dirname, './utils/load-local-patata'))()
      require(patatafile)

      var cli = patata.cli
      cli(argv.suite, patata)
      resolve()
    } catch (ex) {
      reject(ex)
    }
  })
}
