"use strict";

var Liftoff = require('liftoff');

const Patata = new Liftoff({
  name: 'patata',
  processTitle: 'patata',
  moduleName: 'patata',
  configName: 'patatafile',
  v8flags: ['--harmony'] // or v8flags: require('v8flags')
});
Patata.launch({}, function(result) {
    var argv = require('yargs').argv;
    if (argv._.length === 0) {
        throw "No suites launched. Please use: patata [suite]";
    }
    
    // Require patatafile
    require(result.configPath);
    var patata = require(result.modulePath);
    
    // Init suite
    patata.init(argv._[0]);

    // Init cucumber
    var Cucumber = require('./node_modules/cucumber/lib/cucumber');
    var supportDir = process.cwd() + '\\node_modules\\patata\\dist\\js\\cucumber\\support\\';
    var featuresDir = process.cwd() + '\\features\\';
    var cli = Cucumber.Cli(['','',"--require", supportDir, "--require", featuresDir, featuresDir]);
    cli.run(function (succeeded) {
    var code = succeeded ? 0 : 1;

    function exitNow() {
        process.exit(code);
    }

    if (process.stdout.write('')) {
        exitNow();
    } else {
        // write() returned false, kernel buffer is not empty yet...
        process.stdout.on('drain', exitNow);
    }
    });

});

