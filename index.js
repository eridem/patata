#!/usr/bin/env node

"use strict";

var Liftoff = require('liftoff');

var Patata = new Liftoff({
  name: 'patata',
  processTitle: 'patata',
  moduleName: 'patata',
  configName: 'patatafile'
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
    
    patata.currentSuite.features = 
        patata.currentSuite.features && patata.currentSuite.features.length ? 
        patata.currentSuite.features :
        [ 'features' ];
    
    // Init cucumber
    var Cucumber = require(process.cwd() + '/node_modules/cucumber/lib/cucumber');
    var supportDir = process.cwd() + '/node_modules/patata/dist/js/cucumber/support/';
    
    var defaultArgs = ['','', '--require', supportDir];
    var featureRequireArgs = buildFeatureArgs(patata.currentSuite, true);    
    var featureArgs = buildFeatureArgs(patata.currentSuite);    

    var args = defaultArgs.concat(featureRequireArgs);
    args = args.concat(featureArgs);
    
    console.log(args);
    
    var cli = Cucumber.Cli(args);
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

function buildFeatureArgs(suite, useRequire) {
    var result = [];
    
    for (var i = 0; i < suite.features.length; i++) {
        if (useRequire) {
            result.push('--require');
        }
        result.push(process.cwd() + '/' + suite.features[i]);
    }
    
    return result;
}