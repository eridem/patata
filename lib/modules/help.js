'use strict'

module.exports = function (dep) {
  const helps = {
    warningDueJdk: () => {
      const { log } = dep
      log.warn('You must install Java JDK to automate on Android: http://www.oracle.com/technetwork/java/javase/downloads/index.html')
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
    errorDueRootPath: () => {
      const { log } = dep
      log.exit(['You must run this command on the root path of the project, or the file "patata.yml" must exist.'])
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
    },
    errorDueNonExistingPlatform: (platform) => {
      const { log } = dep
      log.exit(`Platform [${platform}] does not exist.`)
    }
  }

  return helps
}
