/* global mkdir, cp  */
'use strict'

function validate (opts) {
  let {validation, help} = opts
  if (!validation.hasName(opts)) {
    help.errorDueName(opts)
  }
}

module.exports = function (opts) {
  let {latestVersion, validation, argv, log, examplePath} = opts
  validate(opts)

  log.log('Init Patata project')
  return new Promise((resolve, reject) => {
    const extend = require('util')._extend
    const path = require('path')
    const fs = require('fs')
    const name = validation.formatName(argv.name)

    latestVersion().then((version) => {
      log.log(`Using Patata version ${version}`)
      opts = extend(opts, {name, version, reject, resolve})
      try {
        install(opts)
      } catch (ex) {
        reject()
      }
    }).catch(reject)

    function install (opts) {
      try {
        const { version, name, reject, resolve } = opts
        const targetFolder = path.join(process.cwd(), name)
        const packageJsonPath = path.join(targetFolder, '/package.json')
        log.log('Creating project in', `"${targetFolder}"`)

        // Copy all information
        mkdir('-p', targetFolder)
        cp('-Rf', path.join(examplePath, '/init') + '/*', targetFolder)
        cp('-Rf', path.join(examplePath, '/init/.patata.yml'), targetFolder)

        // Change name and Patata version
        log.log('Modifying', `"${packageJsonPath}"`)
        let packageJson = require(packageJsonPath)
        packageJson.name = name
        packageJson.dependencies = { patata: `^${version}` }
        packageJson = JSON.stringify(packageJson, null, 2)

        log.log('Saving files...')
        fs.writeFile(packageJsonPath, packageJson, (err) => {
          if (err) {
            log.exit([err])
            reject()
          } else {
            resolve()
          }
        })
      } catch (ex) {
        log.exit(['There was an error creating the project'])
      }
    }
  })
}
