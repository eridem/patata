#!/usr/bin/env node
/* global test */
'use strict'

const opts = {}
require('shelljs/global')
const path = require('path')
let terminalWidth = require('yargs').terminalWidth()
terminalWidth = terminalWidth > 150 ? 150 : terminalWidth
const yargs = require('yargs')
  .wrap(terminalWidth)
  .usage('\nUsage: $0 <command> [options]')
  .command('init', 'Create a new project')
  .command('install', 'Install all dependencies needed for the QA project')
  .command('feature', 'Create the needed files for a new feature')
  .command('component', 'Create a new component')
  .command('run', 'Run test based on a file, uri or HockeyApp')
  .command('setting', 'Get or set a global settings on the ".patata.yml"')
  .options(require('./argv'))
  .nargs('setting', 2)
  .nargs('component', 3)
  .example('$0 init "My New QA Project"', 'Create a new project')
  .example('$0 install', 'Install all dependencies needed for QA project')
  .example('$0 component "Login Button" "content-description" "login_button" --ios', 'Create a new component for iOS')
  .example('$0 feature "My Nice Feature"', 'Scaffolding: create the structure needed for a new feature')
  .example('$0 setting HockeyApp.Token "123456"', 'Set the HockeyApp token key to fetch apps')
  .example('$0 run ./myapp.apk --tags "@ci"', 'Run test on Android with a APK file and tags')
  .example('$0 run http://example.com/bin/myapp.ipa --on-done "./myTriggers/ondone.js"', 'Run test on Android with a APK file and tags')

opts.argv = yargs.argv
opts.command = opts.argv._[0]

if (!opts.command) {
  yargs.showHelp()
} else {
  if (opts.argv._.length > 1) {
    opts.argv.name = opts.argv._[1]
  }
  if (opts.argv._.length === 3) {
    opts.argv.value = opts.argv._[2]
  }
  if (opts.argv._.length === 4) {
    opts.argv.key = opts.argv._[2]
    opts.argv.value = opts.argv._[3]
  }
  const packageJson = require(path.join(__dirname, './package.json'))

  opts.colors = require('colors')
  opts.shell = require('shelljs')
  opts.log = require(path.join(__dirname, './lib/utils/log'))(opts)
  opts.scriptPath = path.join(__dirname, 'lib', opts.command + '.js')
  opts.examplePath = path.join(__dirname, './lib/examples')
  opts.help = require(path.join(__dirname, 'lib/utils/help'))
  opts.validation = require(path.join(__dirname, 'lib/utils/validation'))
  opts.latestVersion = require(path.join(__dirname, 'lib/utils/latest-version'))
  opts.platform = require(path.join(__dirname, 'lib/utils/platform'))(opts)
  opts.setting = require(path.join(__dirname, 'lib/utils/setting'))(opts)
  opts.binaryProvider = require(path.join(__dirname, 'lib/utils/binary-provider'))(opts)
  opts.configProvider = require(path.join(__dirname, 'lib/utils/config-provider'))(opts)
  opts.componentsProvider = require(path.join(__dirname, '/lib/utils/components-provider'))(opts)
  opts.portProvider = require(path.join(__dirname, '/lib/utils/port-provider'))(opts)
  opts.appium = require(path.join(__dirname, 'lib/utils//appium'))(opts)
  opts.cucumber = require(path.join(__dirname, 'lib/utils//cucumber'))(opts)
  opts.bridge = require(path.join(__dirname, 'lib/utils/bridge'))(opts)
  opts.log.log(`Welcome to Patata CLI ${packageJson.version}! More info:`, `${packageJson.homepage}`)

  // On error
  const onError = (ex) => {
    if (!ex) {
      opts.log.exit(['Unknown error'])
    } else if (typeof ex === 'string') {
      opts.log.exit([ex])
    } else if (ex.message) {
      opts.log.exit([ex.message])
    } else {
      opts.log.exit([JSON.stringify(ex)])
    }
  }

  // On success
  const onSuccess = (messages) => {
    if (messages.length) {
      messages.forEach(opts.log.log)
    }
    opts.log.log('Done!')
    process.exit(0)
  }

  // Show help if command does not exists
  if (!test('-e', opts.scriptPath)) {
    yargs.showHelp()

  // Execute command
  } else {
    Promise.all([require(opts.scriptPath)(opts)])
      .then(onSuccess)
      .catch(onError)
  }
}
