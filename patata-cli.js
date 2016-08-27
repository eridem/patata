/* global test */
'use strict'

require('shelljs/global')
const path = require('path')
const terminalWidth = require('yargs').terminalWidth()
const yargs = require('yargs')
  .wrap(terminalWidth)
  .usage('\nUsage: $0 <command> [options]')
  .command('init', 'Create a new project')
  .command('install', 'Install all dependencies needed for the QA project')
  .command('feature', 'Create the needed files for a new feature')
  .command('component', 'Create a new component')
  .command('run', 'Run test based on a file, uri or HockeyApp.')
  .command('setting', 'Get or set a global settings on the ".patata.yml"')
  .options(require('./patata-cli.argv'))
  .nargs('setting', 2)
  .nargs('component', 3)
  .example(`$0 init "My New QA Project"`, 'Create a new project')
  .example(`$0 install`, `Install all dependencies needed for QA project.`)
  .example(`$0 feature "My Nice Feature"`, `Scaffolding: create the structure needed for a new feature`)
  .example(`$0 component "Login Button" "content-description" "login_button" --ios`, `Create a new component for iOS`)
  .example(`$0 run ./myapp.apk --tags "@ci"`, `Run test on Android with a APK file and tags.`)
  .example(`$0 setting HockeyApp.Token "123456"`, `Set the HockeyApp token key to fetch apps`)

const argv = yargs.argv
const command = argv._[0]

if (!command) {
  yargs.showHelp()
} else {
  if (argv._.length > 1) {
    argv.name = argv._[1]
  }
  if (argv._.length === 3) {
    argv.value = argv._[2]
  }
  if (argv._.length === 4) {
    argv.key = argv._[2]
    argv.value = argv._[3]
  }
  const packageJson = require(path.join(__dirname, './package.json'))

  const log = require(path.join(__dirname, './log'))
  const scriptPath = path.join(__dirname, 'lib', command) + '.js'
  const examplePath = path.join(__dirname, './lib/examples')
  const help = require(path.join(__dirname, 'lib/utils/help'))
  const validation = require(path.join(__dirname, 'lib/utils/validation'))
  const latestVersion = require(path.join(__dirname, 'lib/utils/latest-version'))
  const platform = require(path.join(__dirname, 'lib/utils/platform'))({command, latestVersion, argv, validation, help, log})
  const setting = require(path.join(__dirname, 'lib/utils/setting'))({command, latestVersion, argv, validation, help, log, platform})

  log.log(`Welcome to Patata CLI ${packageJson.version}! More info:`, `${packageJson.homepage}`)

  // On error
  const onError = (ex) => {
    if (!ex) {
      log.exit(['Unknown error'])
    } else if (typeof ex === 'string') {
      log.exit([ex])
    } else if (ex.message) {
      log.exit([ex.message])
    } else {
      log.exit([JSON.stringify(ex)])
    }
  }

  // On success
  const onSuccess = (messages) => {
    if (messages.length) {
      messages.forEach(log.log)
    }
    log.log('Done!')
    process.exit(0)
  }

  // Show help if command does not exists
  if (!test('-e', scriptPath)) {
    yargs.showHelp()

  // Execute command
  } else {
    Promise.all([require(scriptPath)({command, latestVersion, argv, validation, platform, help, log, examplePath, setting})])
      .then(onSuccess)
      .catch(onError)
  }
}
