'use strict'

module.exports = function (dep) {
  let cmd = {}
  cmd.command = 'lint'
  cmd.desc = 'Run linters and fix possible code'
  cmd.handler = function (argv) {
    let { join, process, __rootdirname, gherkinLinter } = dep

    // Linters
    const configPath = join(__rootdirname, '/lib/sdk/cucumber/gherkin-lint-rules.json')
    const featureDirs = [join(process.cwd(), '/features/**/*.feature')]
    gherkinLinter.run(configPath, featureDirs)
  }
  return cmd
}
