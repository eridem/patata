'use strict'

const path = require('path')

module.exports = function (opts) {
  const { reject, resolve, appium, patata } = opts

  const buildWithArgs = (prefix, anyArray, argName) => {
    var result = []
    for (var i = 0; i < anyArray.length; i++) {
      if (argName) {
        result.push(argName)
      }
      result.push(prefix + anyArray[i])
    }
    return result
  }

  const createArgs = (opts) => {
    // Load Patata support files for Cucumber
    var supportDir = path.join(__dirname, '/cucumber/support/')

    // Create default arguments for cucumber
    var defaultArgs = ['', '', '--require', supportDir]
    var featureFilesArgs = buildWithArgs('', patata.currentSuite.features.files, '')
    var featureTagArgs = buildWithArgs('', patata.currentSuite.features.tags, '--tags')
    var featureScenarioArgs = buildWithArgs('', patata.currentSuite.features.scenarios, '--name')
    var componentsArgs = buildWithArgs(process.cwd() + '/', patata.currentSuite.components, '--require')
    var implementationArgs = buildWithArgs(process.cwd() + '/', patata.currentSuite.include, '--require')

    // Build cucumber args
    var args = defaultArgs
    args = args.concat(featureTagArgs)
    args = args.concat(featureScenarioArgs)
    args = args.concat(componentsArgs)
    args = args.concat(implementationArgs)
    args = args.concat(featureFilesArgs)

    return args
  }

  const start = (opts) => {
    const { cucumberArgs } = opts

    var Cucumber = require('cucumber')
    var cucumberCli = Cucumber.Cli(cucumberArgs)
    var cucumberCliAction = function (succeeded) {
      appium.stop()
      var code = succeeded ? 0 : 1
      function exitNow () {
        if (code === 0) {
          resolve()
        } else {
          reject(code)
        }
      }
      if (process.stdout.write('')) {
        exitNow()
      } else {
        process.stdout.on('drain', exitNow)
      }
    }
    cucumberCli.run(cucumberCliAction)
  }

  return {start, createArgs}
}
