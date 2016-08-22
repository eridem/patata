'use strict'

const path = require('path')
const exampleFolder = path.join(__dirname, './lib/examples')
const colors = require('colors')
const yargs = require('yargs')
  .help('h')
  .alias('h', 'help')
  .usage('Usage: patata <command> [options]')
  .options(require('./patata-cli.argv'))
const argv = yargs.argv
const log = require('./log')
const packageJson = require('./package.json')

log.log(`Welcome to Patata CLI ${packageJson.version}! More info: ${packageJson.homepage}`)

// On error
const onError = (ex) => {
  if (typeof ex === 'string') {
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

// Run Android or iOS
} else if (argv.runAndroid !== '' || argv.runIOS !== '') {
  Promise.all([require('./lib/run')(argv, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Show help
} else {
  yargs.showHelp()
}
