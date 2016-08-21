'use strict'

module.exports = function (opts, log, exampleFolder) {
  log.log('Create feature')

  require('shelljs/global')
  const path = require('path')
  const extend = require('util')._extend
  const inquirer = require('inquirer')
  const fs = require('fs')

  if (!fs.existsSync('./patatafile.js')) {
      log.exit("You must be on the root directory of a Patata project to run this command.")
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
    run(log, answers)
  })

  function run(log, answers) {

    const platforms = answers.platforms
    const featureName = answers.name.trim()
    const allFeaturesFolder = 'features'
    const featureFolderName = featureName.toLowerCase().replace(/\s/gi, '-').replace(/[^A-Zz-z0-9\-]/gi, '')
    log.log(`Creating folders and files for "${answers.platforms}" in "${featureFolderName}"`)

    const featurePath = path.join(process.cwd(), `${allFeaturesFolder}/${featureFolderName}`)

    log.log(`Creating folders and files for "${featureName}" in "${featurePath}"`)

    platforms.forEach(function (element) {
      const platform = element.toLowerCase().trim()
      const platformFolder = path.join(featurePath, '/', platform.toLowerCase())
      const featureFolder = path.join(featurePath, '/', featureFolderName)

      mkdir('-p', platformFolder)
      cp(path.join(exampleFolder, `/feature-${platform}/feature-example.feature`), path.join(platformFolder, `/${featureFolderName}.feature`))
      cp(path.join(exampleFolder, `/feature-${platform}/feature-example.js`), path.join(platformFolder, `/${featureFolderName}.js`))

      log.log(`Feature created in ${platformFolder}`)
    }, this)
  }
}
