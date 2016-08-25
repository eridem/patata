'use strict'

const path = require('path')
const exampleFolder = path.join(__dirname, './lib/examples')
const colors = require('colors')
const yargs = require('yargs')
  .help('h')
  .alias('h', 'help')
  .usage('Usage: patata <command> [options]')
  .wrap(120)
  .options(require('./patata-cli.argv'))
  .nargs('set-setting', 2)
  .nargs('by', 2)
  .example(`$0 --init "My New QA Project"`, 'Create a new project')
  .example(`$0 --install`, `Install all dependencies needed for QA project.`)
  .example(`$0 --feature "My Nice Feature"`, `Scaffolding: create the structure needed for a new feature`)
  .example(`$0 --component "Login Button" --by content-description "login_button" --ios`, `Create a new component for iOS`)
  .example(`$0 --run ./myapp.apk --android --tags "@android,@ci`, `Run test on Android with a APK file and tags.`)
  .example(`$0 --set-setting HockeyApp.Token "...."`, `Set the HockeyApp token key to fetch apps`)

const argv = yargs.argv
const log = require('./log')
const packageJson = require('./package.json')

log.log(`Welcome to Patata CLI ${packageJson.version}! More info: ${packageJson.homepage}`)

// On error
const onError = (ex) => {
  if (!ex) {
    log.exit('Unknown error')
  } else if (typeof ex === 'string') {
    log.exit(ex)
  } else if (ex.message) {
    log.exit(ex.message)
  } else {
    log.exit(JSON.stringify(ex))
  }
}
// On success
const onSuccess = () => {
  log.log('Done!')
  exit(0)
}

const getPlatformOrError = (argv) => {
  if (!argv.android && !argv.ios && !argv.common) {
    log.exit('You must specify the platform argument.\n[Patata] E.g. patata <command> --ios             # --ios | --android | --common')    
  }

  if (argv.android) return 'android'
  if (argv.ios) return 'ios'
  if (argv.common) return 'common'
  return null
}

// Init
if (argv.init === '' || argv.init && argv.init.length) {
  Promise.all([require('./lib/init')(argv, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Install
} else if (argv.install) {
  Promise.all([require('./lib/install')(argv, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Show Suite
} else if (argv.suite === '') {
  Promise.all([require('./lib/show-suites')(argv, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Run Suite
} else if (argv.suite && argv.suite.length) {
  Promise.all([require('./lib/run-suite')(argv, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Create feature
} else if (argv.feature && argv.feature.length) {
  Promise.all([require('./lib/create-feature')(argv, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Set HockeyApp token
} else if (argv['set-setting'] && argv['set-setting'].length) {
  let settingName = argv['set-setting'][0].toLowerCase()
  Promise.all([require(`./lib/set-setting-${settingName}`)(argv, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Create common component
} else if (argv.component && argv.component.length) {
  let platform = getPlatformOrError(argv)
  if (!argv.by || argv.by.length !== 2) {
    return log.exit(
      `You must specify the --by argument to know how to fetch this element.\n` +
      `[Patata] E.g: patata --component "Login Button" --by content-description "my_button" --ios`)
  }

  Promise.all([require(`./lib/component-create`)(argv, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Run
} else if (argv.run && argv.run.length) {
  let platform = getPlatformOrError(argv)
  Promise.all([require('./lib/run')(argv, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Show help
} else {
  yargs.showHelp()
}
