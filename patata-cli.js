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

if (args.init === '' || args.init && args.init.length) {
  log.log('Init Patata project')
  require('./lib/init')(args, log, exampleFolder)

} else if (args.suite === '') {
  // Show suites
  log.log('Available suites')
  require('./lib/show-suites')(log)

} else if (args.suite && args.suite.length) {
  // Run suite
  log.log('Run suite')
  require('./lib/run-suite')(args.suite);

/*} else if (args.run) {
  // Run custom suite
  require('./lib/run-custom-suite')(args)*/
} else if (args.createFeature === '') {
  // Run suite
  log.log('Create feature')
  require('./lib/create-feature')(args, log, exampleFolder);
  
} 
else {
  yargs.showHelp();
  return;
}