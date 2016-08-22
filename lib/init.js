'use strict'

module.exports = function (opts, log, exampleFolder) {
  log.log('Init Patata project')

  return new Promise((resolve, reject) => {
    require('shelljs/global')

    const latest = require('latest')
    const extend = require('util')._extend
    const colors = require('colors')
    const path = require('path')
    const fs = require('fs')

    latest('patata', (err, patataVersion) => {
      if (err || !patataVersion) {
        return reject(err || 'Could not find Patata version')
      }
      log.log(`Using Patata version ${patataVersion}`)

      try {
        install({ name: opts.init, version: patataVersion }, reject, resolve)
      } catch (ex) {
        reject()
      }
    })

    function install (opts, reject, resolve) {
      try {
        const { version, name } = opts
        const projectName = name.toLowerCase().replace(/[^\w]/gi, '-')
        const targetFolder = path.join(process.cwd(), projectName)
        const packageJsonPath = path.join(targetFolder, `/package.json`)
        log.log(`Creating project in "${targetFolder}"...`)

        // Copy all information
        mkdir('-p', targetFolder)
        cp('-Rf', path.join(exampleFolder, '/init') + '/*', targetFolder)

        // Change name and Patata version
        log.log(`Modifying ${packageJsonPath}`)
        let packageJson = require(packageJsonPath)
        packageJson.name = projectName
        packageJson.dependencies = { patata: `^${version}` }
        packageJson = JSON.stringify(packageJson, null, 2)

        log.log('Saving files...')
        fs.writeFile(packageJsonPath, packageJson, (err) => {
          if (err) {
            log.exit(err)
            reject()
          } else {
            resolve()
          }
        })
      } catch (ex) {
        log.exit(`There was an error creating the project...`)
      }
    }
  })
}
