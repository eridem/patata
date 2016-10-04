'use strict'

module.exports = function (dep) {
  const helps = {
    jdk: 'You must install Java JDK to automate on Android: http://www.oracle.com/technetwork/java/javase/downloads/index.html',
    notOnRootOrPatataConfigDoesNotExists: 'You are not in the root directory or "patata.yml" does not exists.',

    contentCommonArgumentsError: (current, fetchMethods) => {
      return `Wrong access type "${current}". It must be one of these "${fetchMethods}"`
    },
    warningDueConfigNotExists: (configPath) => {
      const { log } = dep
      log.warn([`You do not have a config file. It has been created automatically in "${configPath}"`])
    },
    errorByAndroidHome: () => {
      const { log } = dep
      log.exit(`You must setup ANDROID_HOME environment variable pointing to the Android SDK path: https://developer.android.com/studio/index.html#downloads`)
    },
    errorDueNpmInstallation: () => {
      const { log } = dep
      log.exit(`There was a problem performing "npm install". Are you connected to the internet? Remove the folder "node_modules" and try again.`)
    },
    errorDueCannotObtainPatataVersion: () => {
      const { log } = dep
      log.exit(`There was an error obtaining the latest Patata version, are you connected to the Internet?`)
    },
    errorDueKey: () => {
      const { log } = dep
      log.exit(['You key name is invalid.', 'E.g. patata <command> Key.Name'])
    },
    errorDueMissingArguments: (examples) => {
      const { command, log } = dep
      examples = typeof examples === 'string' ? [examples] : examples instanceof Array ? examples : []
      examples = ['You are missing arguments to run this command'].concat(examples || [`E.g.: patata ${command} "XYZ"`])
      log.exit(examples)
    },
    errorDueName: (examples) => {
      const { command, log } = dep
      examples = typeof examples === 'string' ? [examples] : examples instanceof Array ? examples : []
      examples = ['You must run this command with a valid name.'].concat(examples || [`E.g.: patata ${command} "XYZ"`])
      log.exit(examples)
    },
    errorDueRootPath: () => {
      const { log } = dep
      log.exit(['You must run this command on the root path of the project, or the file "patata.yml" must exist.'])
    },
    errorDueNonExistingSetting: () => {
      const { log, argv } = dep
      log.exit([`The setting with name "${argv.name}" does not exists.`])
    },
    errorDueHockeyAppTokenNotExists: () => {
      const { log } = dep
      log.exit(['The HockeyApp.Token does not exists on the config file'])
    },
    errorDueNotHockeyAppName: () => {
      const { log, argv } = dep
      log.exit(['You must specify the application name or id.', `You sent "${argv.name}"`, 'E.g. hockeyapp://?name=My App', 'E.g. hockeyapp://?id=aaaabbbbccccdddd0000111122223333'])
    },
    errorDueMalformedHockeyAppFilter: () => {
      const { log, argv } = dep
      log.exit(['You must specify the filter name and value.', `You sent "${argv.name}"`, 'E.g. hockeyapp://?name=My App&filterName=notes&filterValue=my note'])
    },
    errorDueConfigDoesNotContainHockeyAppToken: () => {
      const { log } = dep
      log.exit(['The file "patata.yml" must contain the HockeyApp section: HockeyApp: { Token: aaaabbbbccccdddd0000111122223333 }'])
    },
    errorDueConfigDoesNotContainProfile: (name) => {
      const { log } = dep
      log.exit(['The file "patata.yml" must contain a section as:', 'Profile:', `  ${name}: patata <your-options>`])
    }
  }

  return helps
}
