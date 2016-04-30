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
    
    // Fix default values
    var currentSuite = patata.getSuite(argv._[0]);
       
    currentSuite.features = currentSuite.features || {};
    currentSuite.features.files = currentSuite.features.files || [];
    currentSuite.features.tags = currentSuite.features.tags || [];
    currentSuite.features.scenarios = currentSuite.features.scenarios || [];
        
    currentSuite.servers =    
        currentSuite.servers && currentSuite.servers.length ? 
        currentSuite.servers :
        [{ host: 'localhost', port: 4723 }]; 
    
    patata.suite(argv._[0], currentSuite);
    
    // Init suite
    patata.init(argv._[0]);
    
    // Init cucumber
    var Cucumber = require(process.cwd() + '/node_modules/cucumber/lib/cucumber');
    var supportDir = process.cwd() + '/node_modules/patata/dist/js/cucumber/support/';
    
    var defaultArgs = ['','', '--require', supportDir];
    
    var featureFilesArgs =      buildWithArgs('', patata.currentSuite.features.files, '');
    var featureTagArgs =        buildWithArgs('', patata.currentSuite.features.tags, '--tags');
    var featureScenarioArgs =   buildWithArgs('', patata.currentSuite.features.scenarios, '--name');
    
    var componentsArgs =        buildWithArgs(process.cwd() + '/', patata.currentSuite.components, '--require');
    var implementationArgs =    buildWithArgs(process.cwd() + '/', patata.currentSuite.implementations, '--require');

    // Build cucumber args
    var args = defaultArgs;
    args = args.concat(featureTagArgs);
    args = args.concat(featureScenarioArgs);
    args = args.concat(componentsArgs);
    args = args.concat(implementationArgs);
    args = args.concat(featureFilesArgs);
    
    console.log("Tags:\t\t " + patata.currentSuite.features.tags);
    console.log("Scenarios:\t " + patata.currentSuite.features.scenarios);
    console.log("Components:\t " + patata.currentSuite.components);
    console.log("Implementations: " + patata.currentSuite.implementations);
    console.log("Features:\t " + patata.currentSuite.features.files);
   
    // Init cucumber with args
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

function buildWithArgs(prefix, anyArray, argName) {
    var result = [];
    
    for (var i = 0; i < anyArray.length; i++) {
        if (argName) {
            result.push(argName);
        }
        result.push(prefix + anyArray[i]);
    }
    
    return result;
}