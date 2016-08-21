'use strict'

module.exports = function (opts, log, exampleFolder) {
  log.log('Init Patata project')

  return new Promise((resolve, reject) => {
    require('shelljs/global')

    const latest = require('latest')
    const extend = require('util')._extend
    const inquirer = require('inquirer')
    const colors = require('colors')
    const path = require('path')
    const fs = require('fs')

    latest('patata', (err, patataVersion) => {
      if (err || !patataVersion) {
        return reject(err || 'Could not find Patata version')
      }
      log.log(`Using Patata version ${patataVersion}`)

      if (!opts.init) {
        var answers = { version: patataVersion }
        inquirer.prompt({
          type: 'input',
          name: 'projectName',
          message: 'Project Name:'
        }).then(function (value) {
          answers = extend(answers || { }, value)
          try {
            install(answers, reject, resolve)
          } catch (ex) {
            reject()
          }
        })
      } else {
        try {
          install({ projectName: opts.init, version: patataVersion }, reject, resolve)
        } catch (ex) {
          reject()
        }
      }
    })

    function install (answers) {      
      log.log('Creating project folder...')
      const targetFolder = answers.projectName.toLowerCase().replace(/[^\w]/gi, '-')
      const projectName = targetFolder

      mkdir(targetFolder)

      log.log('Creating patatafile.js...')
      cp(path.join(exampleFolder, `/patatafile.js`), path.join(targetFolder, `patatafile.js`))

      log.log('Creating features...')
      mkdir(path.join(targetFolder, `features`))

      log.log('Creating components...')
      mkdir(path.join(targetFolder, `components`))
      mkdir(path.join(targetFolder, `components/android`))
      mkdir(path.join(targetFolder, `components/ios`))
      mkdir(path.join(targetFolder, `components/common`))
      cp(path.join(exampleFolder, `/ui.android.js`), path.join(targetFolder, `./components/android/`))
      cp(path.join(exampleFolder, `/ui.ios.js`), path.join(targetFolder, `./components/ios/`))
      cp(path.join(exampleFolder, `/ui.common.js`), path.join(targetFolder, `./components/common/`))

      log.log('Creating configurations...')
      mkdir(path.join(targetFolder, `config`))
      cp(path.join(exampleFolder, `/config.js`), path.join(targetFolder, `./config/`))

      log.log('Creating jsconfig file...')
      cp(`${exampleFolder}/jsconfig.json`, targetFolder)

      log.log('Creating README and LICENSE files...')
      cp(path.join(exampleFolder, `/README.md`), targetFolder)
      cp(path.join(exampleFolder, `/LICENSE.md`), targetFolder)

      log.log('Solving dependencies...')
      let packagejson = require(path.join(exampleFolder, `/package.json`))
      packagejson.name = answers.projectName.toLowerCase().replace(/[^\w]/gi, '-')
      packagejson.dependencies = { patata: `^${answers.version}` }

      log.log('Saving files...')
      fs.writeFile(path.join(targetFolder, `/package.json`), JSON.stringify(packagejson, null, 2), (err) => {
        if (err) {
          reject()
        } else {
          resolve()
        }
      })
    }
  })
}
