'use strict'

module.exports = function (opts, loader) {
  require('shelljs/global')

  const extend = require('util')._extend
  const inquirer = require('inquirer')

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
          type: 'checkbox',
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
    loader.start('Creating folders and files...')
    let featureFolderName = answers.name.toLowerCase().replace(/\s/gi, '-').replace(/[^A-Zz-z0-9\-]/gi, '_')
    let finalMessages = []
    answers.platforms.forEach(function (element) {
      let allFeaturesFolder = 'features'
      let platformFolder = `${allFeaturesFolder}/${element.toLowerCase()}`
      let featureFolder = `${platformFolder}/${featureFolderName}`

      mkdir('-p', allFeaturesFolder)
      mkdir('-p', platformFolder)
      mkdir('-p', featureFolder)
      touch(`${featureFolder}/${featureFolderName}.js`)
      touch(`${featureFolder}/${featureFolderName}.feature`)
      finalMessages.push(`Feature created in ${featureFolder}`)
    }, this)

    finalMessages.forEach(loader.log)
  }
}
