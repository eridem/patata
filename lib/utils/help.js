'use strict'

module.exports = {
  jdk: 'You must install Java JDK to automate on Android: http://www.oracle.com/technetwork/java/javase/downloads/index.html',
  androidHome: 'You must setup ANDROID_HOME environment variable pointing to the Android SDK path: https://developer.android.com/studio/index.html#downloads',
  notOnRootOrPatataConfigDoesNotExists: `You are not in the root directory or ".patata.yml" does not exists.`,

  contentCommonArgumentsError: (current, fetchMethods) => {
    return `Wrong access type "${current}". It must be one of these "${fetchMethods}"`
  },

  errorDueKey: (opts) => {
    const { log } = opts
    log.exit([`You key name is invalid.`, `E.g. patata <command> Key.Name`])
  },
  errorDueMissingArguments: (opts, examples) => {
    const { command, log } = opts
    examples = typeof examples === 'string' ? [examples] : examples instanceof Array ? examples : []
    examples = [`You are missing arguments to run this command`].concat(examples || [`E.g.: patata ${command} "XYZ"`])
    log.exit(examples)
  },
  errorDueName: (opts, examples) => {
    const { command, log } = opts
    examples = typeof examples === 'string' ? [examples] : examples instanceof Array ? examples : []
    examples = [`You must run this command with a valid name.`].concat(examples || [`E.g.: patata ${command} "XYZ"`])
    log.exit(examples)
  },
  errorDueRootPath: (opts) => {
    const { log } = opts
    log.exit([`You must run this command on the root path of the project, or the file ".patata.yml" must exist.`])
  },
  errorDueNonExistingSetting: (opts) => {
    const { log, argv } = opts
    log.exit([`The setting with name "${argv.name}" does not exists.`])
  },
  errorDueHockeyAppTokenNotExists: (opts) => {
    const { log } = opts
    log.exit([`The HockeyApp.Token does not exists on the config file`])
  }
}
