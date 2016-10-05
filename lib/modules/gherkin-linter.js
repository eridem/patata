'use strict'

module.exports = function (dep) {
  const run = function (configFilePath, featureDirs, ignore) {
    const { __rootdirname, join, log } = dep

    var linter = require(join(__rootdirname, 'node_modules/gherkin-lint/src/linter.js'))
    var featureFinder = require(join(__rootdirname, 'node_modules/gherkin-lint/src/feature-finder.js'))
    var configParser = require(join(__rootdirname, 'node_modules/gherkin-lint/src/config-parser.js'))

    var files = featureFinder.getFeatureFiles(featureDirs, ignore)
    var configPath = configParser.getConfiguration(configFilePath)
    var results = linter.lint(files, configPath)
    printResults(results)
    return getExitCode(results)

    function getExitCode (results) {
      var exitCode = 0
      results.forEach(function (result) {
        if (result.errors.length > 0) {
          exitCode = 1
        } else {
        }
      })
      return exitCode
    }

    function printResults (results) {
      results.forEach(file => {
        file.errors.forEach(error => {
          let filePath = file.filePath.replace(process.cwd(), '')
          log.warn(`  ${filePath}:${error.line}:`, error.message)
        })
      })
    }
  }

  return {run}
}
