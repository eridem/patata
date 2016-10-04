'use strict'

module.exports = function (dep) {
  let cmd = {}
  cmd.command = 'profile <name>'
  cmd.desc = 'Run a saved CLI command options.'
  cmd.handler = function (argv) {
    let { log, help, shell, setting, process } = dep
    let { name } = argv

    let settings = setting.get()
    if (!settings.Profiles || !settings.Profiles[name]) {
      help.errorDueConfigDoesNotContainProfile(name)
    }
    const profile = settings.Profiles[name]
    log.log(`Running: ${profile}`)
    process.exit(shell.exec(profile, {silent: false}).code)
  }
  return cmd
}
