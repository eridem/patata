'use strict'

module.exports = function (dep) {
  const buildWithArgs = (prefix, anyArray, argName) => {
    let result = []
    for (let i = 0; i < anyArray.length; i++) {
      if (argName) {
        result.push(argName)
      }
      result.push(prefix + anyArray[i])
    }
    return result
  }

  const createArgs = (report) => {
    const { join, process, log } = dep
    const patata = dep.patata.get()

    // Load Patata support files for Cucumber
    const supportDir = join(process.cwd(), 'node_modules/patata/dist/cucumber/support/')
    const reportFile = join(report.dirPath, `results`)

    // Create default arguments for cucumber
    let defaultArgs = ['', '', '--require', supportDir]
    let currentSuite = patata.currentSuite
    let featureTagArgs = buildWithArgs('', currentSuite.features.tags, '--tags')
    let componentsArgs = buildWithArgs('', currentSuite.components, '--require')
    let implementationArgs = buildWithArgs('', currentSuite.include, '--require')

    // Reports
    let reportsArgs = [
      `--format`, `pretty`,
      `--format`, `json:${reportFile}.json`,
      `--format`, `pretty:${reportFile}.pretty`,
      `--format`, `rerun:${reportFile}.rerun`,
      `--format`, `snippets:${reportFile}.snippets`,
      `--format`, `summary:${reportFile}.summary`
      ]

    // Build cucumber args
    let args = defaultArgs
    args = args.concat(featureTagArgs)
    args = args.concat(componentsArgs)
    args = args.concat(implementationArgs)
    args = args.concat(reportsArgs)

    log.debug('Cucumber: ' + JSON.stringify(args))

    return args
  }

  const start = (onDone, report) => {
    const { appium, join } = dep

    const cucumberArgs = createArgs(report)
    const cucumberPath = join(process.cwd(), '/node_modules/cucumber/lib/cucumber')
    let Cucumber = require(cucumberPath)
    let cucumberCli = Cucumber.Cli(cucumberArgs)
    let cucumberCliAction = function (succeeded) {
      appium.stop()
      let code = succeeded ? 0 : 1
      function exitNow () {
        if (code === 0) {
          onDone(true)
        } else {
          onDone(false)
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
