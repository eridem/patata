'use strict'

module.exports = function (opts, loader, exampleFolder) {
  require('shelljs/global')
  const extend = require('util')._extend
  const inquirer = require('inquirer')
  const fs = require('fs')

  if (!fs.existsSync('./patatafile.js')) {
      loader.exit("You must be on the root directory of a Patata project to run this command.")
  }

  var answers = { }
  inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Feature Name:'
  }).then(function (value) {
    answers = extend(answers || {}, value)
    return inquirer.prompt(
      [
        {
          type: 'list',
          message: 'Select Platforms',
          name: 'platforms',
          choices: [{ name: 'All' }, { name: 'iOS' }, { name: 'Android' }],
          validate: function (answer) {
            if (answer.length < 1) {
              return '[Patata] You must choose at least one platform or "All".'
            }
            return true
          }
        }])
  }).then(function (value) {
    answers = extend(answers || {}, value)
    run(loader, answers)
  })

  function run (loader, answers) {
    let featureName = answers.name.trim()
    let allFeaturesFolder = 'features'
    let featureFolderName = featureName.toLowerCase().replace(/\s/gi, '-').replace(/[^A-Zz-z0-9\-]/gi, '_')

    loader.log(`Creating folders and files for "${featureName}]"`)

    mkdir('-p', allFeaturesFolder)

    answers.platforms.forEach(function (element) {
      let platformFolder = `${allFeaturesFolder}/${element.toLowerCase()}`
      let featureFolder = `${platformFolder}/${featureFolderName}`

      mkdir('-p', platformFolder)
      mkdir('-p', featureFolder)
      cp(`${exampleFolder}/feature-example.feature`, `${featureFolder}/${featureFolderName}.feature`)
      cp(`${exampleFolder}/feature-example.js`, `${featureFolder}/${featureFolderName}.js`)

      loader.log(`Feature created in ${featureFolder}`)
    }, this)
  }
}
