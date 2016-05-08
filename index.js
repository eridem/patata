#!/usr/bin/env node

"use strict";

var Liftoff = require('liftoff');
var getPort = require('get-port');
var Q = require('q');
var colors = require('colors');

var appiumApp;

var Patata = new Liftoff({
  name: 'patata',
  processTitle: 'patata',
  moduleName: 'patata',
  configName: 'patatafile'
});

Patata.launch({}, function(result) {
    printLogo();
    
    var argv = require('yargs').argv;
    if (argv._.length === 0) {
        throw "No suites launched. Please use: patata [suite]";
    }
    
    // Get suite name
    var suiteCli = argv._[0];
    
    // Require patatafile
    require(result.configPath);
    var patata = require(result.modulePath);
       
    // Fix default values
    fixDefaultValues(patata, suiteCli).then(function(patata) {
        // Current suite
        var currentSuite = patata.getSuite(suiteCli);
        
        // Start appium
        startAppium(currentSuite).then(() => {
            // Init suite
            patata.init(suiteCli);
            
            // Create cucumber args
            var cucumberArgs = createCucumberArgs(patata);
        
            // Init cucumber with args
            startCucumber(cucumberArgs);
        });
    });
});

//
// Fix default suite values that were optional
// on the patata configuration suite from patatafile.js
//
function fixDefaultValues(patata, suiteCli) {
    var deferred = Q.defer();
    
    getPort().then(function(port) {    
        // Current suite
        var currentSuite = patata.getSuite(suiteCli);
         
        // Fix features default values
        currentSuite.features = currentSuite.features || {};
        currentSuite.features.files = currentSuite.features.files || [];
        currentSuite.features.tags = currentSuite.features.tags || [];
        currentSuite.features.scenarios = currentSuite.features.scenarios || [];
            
        // Fix server default values
        currentSuite.servers =    
            currentSuite.servers && currentSuite.servers.length ? 
            currentSuite.servers :
            [{ host: 'localhost', port: port }]; 
        
        // Replace previous suite with complete values
        patata.suite(suiteCli, currentSuite);
        
        // Return
        deferred.resolve(patata, suiteCli);
    });
    
    return deferred.promise;
}

//
// Start appium based on the patata configuration suite
// 
function startAppium(currentSuite) {
    // User first server (TODO: be able to use more servers)
    var server = currentSuite.servers[0];
    
    // Create appium arguments
    var cmd = 'appium -p ' + server.port + ' -a ' + server.host;
    
    // Exec appium
    appiumApp = require('child_process').exec(cmd);
    
    var deferred = Q.defer();
    setTimeout(deferred.resolve, 3000);
    return deferred.promise;
}

function stopAppium() {
    if (appiumApp) {
        appiumApp.exit();
    }
}

//
// Create the neccesary cucumber args based on
// the patata configuration suite.
//
function createCucumberArgs(patata) {
    // Load Patata support files for Cucumber
    var supportDir = process.cwd() + '/node_modules/patata/dist/js/cucumber/support/';
        
    // Create default arguments for cucumber
    var defaultArgs = ['','', '--require', supportDir];
    
    var featureFilesArgs =      buildWithArgs('', patata.currentSuite.features.files, '');
    var featureTagArgs =        buildWithArgs('', patata.currentSuite.features.tags, '--tags');
    var featureScenarioArgs =   buildWithArgs('', patata.currentSuite.features.scenarios, '--name');
    
    var componentsArgs =        buildWithArgs(process.cwd() + '/', patata.currentSuite.components, '--require');
    var implementationArgs =    buildWithArgs(process.cwd() + '/', patata.currentSuite.include, '--require');

    // Build cucumber args
    var args = defaultArgs;
    args = args.concat(featureTagArgs);
    args = args.concat(featureScenarioArgs);
    args = args.concat(componentsArgs);
    args = args.concat(implementationArgs);
    args = args.concat(featureFilesArgs);
    
    // Print on screen
    printMessage(patata);
    
    return args;
}

//
// Start cucumber cli based on arguments
//
function startCucumber(args) {
    // Init cucumber
    var Cucumber = require(process.cwd() + '/node_modules/cucumber/lib/cucumber');
    var cucumberCli = Cucumber.Cli(args);
    var cucumberCliAction = function (succeeded) {
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
    };

    cucumberCli.run(cucumberCliAction).then(function() {
        stopAppium();   
    });
}

//
// Create an cli arguments based on an array and prefix. If not prefix, pass null.
// Eg. (prefix = '--letter') and (anyArray = ['a','b','c'])
//     Result: ['--letter a', '--letter b', '--letter c']
// Useful to create arguments for appium cli
//
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

function printMessage(patata) {
    console.log("Tags:".cyan, "\t\t " + patata.currentSuite.features.tags);
    console.log("Scenarios:".cyan, "\t " + patata.currentSuite.features.scenarios);
    console.log("Components:".cyan, "\t " + patata.currentSuite.components);
    console.log("Include:".cyan, "\t " + patata.currentSuite.include);
    console.log("Features:".cyan, "\t " + patata.currentSuite.features.files);
    console.log("\n");
}

function printLogo() {    
    console.log(
        "                  __             __                __\n".yellow +
        "______  _____   _/  |_ _____   _/  |_ _____       |__|  ____\n".yellow +
        "\\____ \\ \\__  \\  \\   __\\\\__  \\  \\   __\\\\__  \\      |  | /  _ \\\n".yellow +
        "|  |_> > / __ \\_ |  |   / __ \\_ |  |   / __ \\_    |  |(  <_> )\n".yellow +
        "|   __/ (____  / |__|  (____  / |__|  (____  / /\\ |__| \\____/\n".yellow +
        "|__|         \\/             \\/             \\/  \\/\n".yellow
    );                                     
}