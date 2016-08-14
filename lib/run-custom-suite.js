'use strict'

// Run specific suite
const Liftoff = require('liftoff')
const inquirer = require('inquirer')

function prepareCustomSuite (patata, args) {
  var questions = []

  if (!args.capability) {
    var capabilities = patata.capabilityFactory._capabilities
    questions.push({
      type: 'list',
      message: 'Select Platforms',
      name: 'platforms',
      choices: Object.keys(capabilities).map((cap) => {
        return { name: cap }})
    })
  }
  if (!args.components) {
      
  }
  var capability = patata.capabilityFactory.get

  args.components = args.components ? JSON.stringify(args.components) : []

  return inquirer.prompt(questions).then(function (answers) {
    output.push(answers)
  })
}

module.exports = function (args) {
  var Patata = new Liftoff({
    name: 'patata',
    processTitle: 'patata',
    moduleName: 'patata'
  })

  Patata.launch({}, function (result) {
    // Require patatafile
    require(result.configPath)
    var patata = require(result.modulePath)

    prepareCustomSuite(patata, args).then(function () {
      var cli = patata.cli
      cli(suiteName, patata)
    })
  })
}
