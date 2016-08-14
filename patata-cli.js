'use strict'

const colors = require('colors')
const yargs = require('yargs')
    .help('h')
    .alias('h', 'help')
    .usage('Usage: patata <command> [options]')
    .options(require('./patata-cli.argv'))
    
const args = yargs.argv

if (args.init === '' || args.init && args.init.length) {
  displayOption('Init Patata project')
  require('./lib/init')(args, new Loader())
} else if (args.suite === '') {
  // Show suites
  displayOption('Available suites')
  require('./lib/show-suites')()
} else if (args.suite && args.suite.length) {
  // Run suite
  displayOption('Run suite')
  require('./lib/run-suite')(args.suite);
/*} else if (args.run) {
  // Run custom suite
  require('./lib/run-custom-suite')(args)*/
} else if (args.feature) {
  // Run suite
  displayOption('Create feature')
  require('./lib/create-feature')(args, new Loader());
} 
else {
  yargs.showHelp();
  return;
}

function displayOption(message) {
  console.log(`[Option: ${message}]`.white.bold.underline)
}

function Loader () {
  this.spinner = null
}
Loader.prototype.log = function(message) {
  console.log(`[Patata]`.yellow, ` ${message}`.gray);
}
Loader.prototype.start = function (message) {
  this.log(message)
}
Loader.prototype.stop = function () {
  //this.spinner.stop()
}