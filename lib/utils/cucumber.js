'use strict'

const path = require('path')

module.exports = function (opts) {
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

  const createArgs = () => {
    const { patata } = opts

    // Load Patata support files for Cucumber
    const supportDir = path.join(process.cwd(), 'node_modules/patata/dist/cucumber/support/')

    // Create default arguments for cucumber
    var defaultArgs = ['', '', '--require', supportDir]
    let currentSuite = patata.currentSuite
    var featureTagArgs = buildWithArgs('', currentSuite.features.tags, '--tags')
    var componentsArgs = buildWithArgs('', currentSuite.components, '--require')
    var implementationArgs = buildWithArgs('', currentSuite.include, '--require')

    // Build cucumber args
    var args = defaultArgs
    args = args.concat(featureTagArgs)
    args = args.concat(componentsArgs)
    args = args.concat(implementationArgs)

    return args
  }

  const start = () => {
    const { reject, resolve, appium } = opts

    const cucumberArgs = createArgs()
    const cucumberPath = path.join(process.cwd(), '/node_modules/cucumber/lib/cucumber')

    var Cucumber = require(cucumberPath)
    var cucumberCli = Cucumber.Cli(cucumberArgs)
    var cucumberCliAction = function (succeeded) {
      appium.stop()
      var code = succeeded ? 0 : 1
      function exitNow () {
        if (code === 0) {
          resolve('Everything alright! Happy testing!')
        } else {
          reject('Finished with errors. Do not give up and cheer up!')
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
