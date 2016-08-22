'use strict'

const path = require('path')
const exampleFolder = path.join(__dirname, './lib/examples')
const colors = require('colors')
const yargs = require('yargs')
  .help('h')
  .alias('h', 'help')
  .usage('Usage: patata <command> [options]')
  .options(require('./patata-cli.argv'))
const args = yargs.argv
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
if (args.init === '' || args.init && args.init.length) {
  Promise.all([require('./lib/init')(args, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Install
} else if (args.install) {
  Promise.all([require('./lib/install')(args, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Show Suite
} else if (args.suite === '') {
    Promise.all([require('./lib/show-suites')(args, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Run Suite
} else if (args.suite && args.suite.length) {
  require('./lib/run-suite')(args.suite)

// Create feature
} else if (args.feature && args.feature.length) {
  require('./lib/create-feature')(args, log, exampleFolder)

// Run Android or iOS
} else if (args.runAndroid !== '' || args.runIOS !== '') {
  Promise.all([require('./lib/run')(args, log, exampleFolder)])
    .then(onSuccess)
    .catch(onError)

// Show help
} else {
  yargs.showHelp()
}
