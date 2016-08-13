'use strict'
const colors = require('colors')

function getSuiteName(patata, suite) {
    if (!suite || !suite.capability) {
        return 'Without Capability'
    }

    var suiteInfo = patata.obtainCapability(suite)
    return suiteInfo.platformName
}

module.exports = (function () {
  // Run specific suite
  var Liftoff = require('liftoff')

  var Patata = new Liftoff({
    name: 'patata',
    processTitle: 'patata',
    moduleName: 'patata',
    configName: 'patatafile'
  })

  Patata.launch({}, function (result) {
    // Require patatafile
    require(result.configPath)
    let patata = require(result.modulePath)
    let suites = patata.suites;

    let groups = {};
    for (let suiteName in suites) {
        let suite = suites[suiteName];
        let name = getSuiteName(patata, suite)
        let suiteInfo = {suiteName: suiteName, suite: suite}

        groups[name] = groups[name] || [];
        groups[name].push(suiteInfo);
    }

    for (let group in groups) {
        console.log('\nPlatform:'.yellow, group);
        for (let i in groups[group]) {
            var suiteInfo = groups[group][i]
            console.log('\tSuite:'.yellow, suiteInfo.suiteName)
        }
    }
  })
})
