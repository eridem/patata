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
        
    patata.currentSuite.servers =    
        patata.currentSuite.servers && patata.currentSuite.servers.length ? 
        patata.currentSuite.servers :
        [{ host: 'localhost', port: 4723 }]; 
    
    // Init cucumber
    var Cucumber = require(process.cwd() + '/node_modules/cucumber/lib/cucumber');
    var supportDir = process.cwd() + '/node_modules/patata/dist/js/cucumber/support/';
    
    var defaultArgs = ['','', '--require', supportDir];
    var featureRequireArgs = buildRequire(patata.currentSuite.features);    
    var componentsRequireArgs = buildRequire(patata.currentSuite.components);
    var featureArgs = buildNoRequire(patata.currentSuite);
    
    var args = defaultArgs;
    args = args.concat(featureRequireArgs);
    args = args.concat(componentsRequireArgs);
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

function buildRequire(anyArray) {
    return buildWithArgs(anyArray, '--require');
}

function buildNoRequire(anyArray) {
    return buildWithArgs(anyArray, null);
}

function buildWithArgs(anyArray, argName) {
    var result = [];
    
    for (var i = 0; i < anyArray.length; i++) {
        if (argName) {
            result.push(argName);
        }
        result.push(process.cwd() + '/' + anyArray[i]);
    }
    
    return result;
}