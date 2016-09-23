'use strict'

module.exports = function (dep) {
  function validate () {
    let {validation, help} = dep
    if (!validation.isPatataRootDir()) {
      help.errorDueRootPath()
    }
  }

  let cmd = {}
  cmd.command = 'install'
  cmd.desc = 'Install all dependencies needed for the QA project'
  cmd.handler = function (argv) {
    let { log, help, shell } = dep
    validate()

    log.log('Installing. This may take few minutes...')

    if (!process.env.JAVA_HOME) {
      log.warn(help.jdk)
    }

    if (shell.exec('npm install', {silent: true}).code !== 0) {
      help.errorDueNpmInstallation()
    } else {
      log.log('Done!')
    }
  }
  return cmd
}
