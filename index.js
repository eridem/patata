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
        
    currentSuite.features = 
        currentSuite.features && currentSuite.features.length ? 
        currentSuite.features :
        [ 'features' ];
        
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
    var tagArgs = buildTags(patata.currentSuite.features);
    var scenarioArgs = buildScenarios(patata.currentSuite.features);
    var componentsRequireArgs = buildRequire(patata.currentSuite.components);
    var featureRequireArgs = buildFeatures(patata.currentSuite.features);
    var featureArgs = buildNoRequire(patata.currentSuite.features);
    
    var args = defaultArgs;
    args = args.concat(tagArgs);
    args = args.concat(scenarioArgs);
    args = args.concat(componentsRequireArgs);
    args = args.concat(featureRequireArgs);
    args = args.concat(featureArgs);
    
    console.log("Tags:\t\t" + tagArgs.toString());
    console.log("Scenarios:\t" + scenarioArgs);
    console.log("Components:\t" + componentsRequireArgs);
    console.log("Features:\t" + featureRequireArgs);
   
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

function buildTags(anyArray) {
    var tags = [];
    for (var i = 0; i < anyArray.length; i++) {
        var item = anyArray[i];
        if (typeof item === 'string' && (item.startsWith('@') || item.startsWith('~@'))) {
            tags.push(item);
        }
    }
    return buildWithArgs('', tags, '--tags');
}

function buildScenarios(anyArray) {
    var scenarios = [];
    for (var i = 0; i < anyArray.length; i++) {
        var item = anyArray[i];
        if (item instanceof RegExp) {
            scenarios.push(item.toString());
        }
    }
    return buildWithArgs('', scenarios, '--name');
}

function buildFeatures(anyArray) {
    var features = [];
    for (var i = 0; i < anyArray.length; i++) {
        var item = anyArray[i];
        if (!(typeof item === 'string' && (item.startsWith('@') || item.startsWith('~@'))) && !(item instanceof RegExp)) {
            features.push(item);
        }
    }
    return buildWithArgs(process.cwd() + '/', features, '--require');
}

function buildRequire(anyArray) {
    return buildWithArgs(process.cwd() + '/', anyArray, '--require');
}

function buildNoRequire(anyArray) {
    var features = [];
    for (var i = 0; i < anyArray.length; i++) {
        var item = anyArray[i];
        if (!(typeof item === 'string' && (item.startsWith('@') || item.startsWith('~@'))) && !(item instanceof RegExp)) {
            features.push(item);
        }
    }
    
    return buildWithArgs(process.cwd() + '/', features, null);
}

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