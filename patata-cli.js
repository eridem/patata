'use strict'

const colors = require('colors')
const yargs = require('yargs')
    .help('h')
    .alias('h', 'help')
    .usage('Usage: patata <command> [options]')
    .options(require('./lib/patata-cli.argv'))
    
const args = yargs.argv

if (args.suite === '') {
  // Show suites
  console.log('[Option: Available suites]'.white.bold.underline)
  require('./lib/show-suites')()
} else if (args.suite && args.suite.length) {
  // Run suite
  console.log('[Option: Run suite]'.white.bold.underline)
  require('./lib/run-suite')(args.suite);
} else {
  yargs.showHelp();
  return;
}