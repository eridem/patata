'use strict'
const colors = require('colors')

function getSuiteName (patata, suite) {
  if (!suite || !suite.capability) {
    return 'Without Capability'
  }

  var suiteInfo = patata.obtainCapability(suite)
  return suiteInfo.platformName
}

module.exports = function (args, log, exampleFolder) {
  return new Promise((resolve, reject) => {
    try {
      const path = require('path')
      const patatafile = path.join(process.cwd(), '/patatafile.js')
      require('shelljs/global')

      if (!test('-e', patatafile)) {
        return reject('"patatafile.js" must exists and you must be on the root of the project to run this command.')
      }

      const patata = require(path.join(__dirname, './utils/load-local-patata'))()
      require(patatafile)

      let suites = patata._suites
      let groups = {}
      for (let suiteName in suites) {
        let suite = suites[suiteName]
        let name = getSuiteName(patata, suite)
        let suiteInfo = {suiteName: suiteName, suite: suite}

        groups[name] = groups[name] || []
        groups[name].push(suiteInfo)
      }

      if (groups.length) {
        log.log('Available suites')
      } else {
        log.log('No availble suites.')
      }

      for (let group in groups) {
        log.log('Platform:', group)
        for (let i in groups[group]) {
          var suiteInfo = groups[group][i]
          log.log(' - Suite:', suiteInfo.suiteName)
        }
      }

      resolve()
    } catch (ex) {
      reject(ex)
    }
  })
}
