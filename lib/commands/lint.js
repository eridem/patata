'use strict'

module.exports = function (dep) {
  let cmd = {}
  cmd.command = 'lint'
  cmd.desc = 'Run linters and fix possible code'
  cmd.handler = function (argv) {
    let { join, log, process, __rootdirname, gherkinLinter } = dep

    // Linters
    const configPath = join(__rootdirname, '/lib/sdk/cucumber/gherkin-lint-rules.json')
    const featureDirs = [join(process.cwd(), '/features/**/*.')]

    log.log('Checking files:', featureDirs.toString())
    if (gherkinLinter.run(configPath, featureDirs) !== 0) {
      log.exit('There are errors to fix on the feature files')
    } else {
      log.log('All feature files look correct!')
    }
  }
  return cmd
}
