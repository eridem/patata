'use strict'

module.exports = function (suiteName) {
  const fs = require('fs')

  if (!fs.existsSync('./patatafile.js')) {
      loader.exit("You must be on the root directory of a Patata project to run this command.")
  }

  // Run specific suite
  var Liftoff = require('liftoff')

  var Patata = new Liftoff({
    name: 'patata',
    processTitle: 'patata',
    moduleName: 'patata',
    configName: 'patatafile'
  })

  Patata.launch({}, function (result) {
    // Require patatafile
    require(result.configPath)
    var patata = require(result.modulePath)

    var cli = patata.cli
    cli(suiteName, patata)
  })
}
