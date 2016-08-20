'use strict'

module.exports = function (opts, loader, exampleFolder) {
  require('shelljs/global')

  const extend = require('util')._extend
  const inquirer = require('inquirer')
  const colors = require('colors')
  const path = require('path')

  if (!opts.init) {
    var answers = {}
    inquirer.prompt({
      type: 'input',
      name: 'projectName',
      message: 'Project Name:'
    }).then(function (value) {
      answers = extend(answers || {}, value)
      install(answers)
    })
  } else {
    install({projectName: opts.init})
  }

  function install (answers) {
    loader.log('Creating project folder...')
    mkdir(answers.projectName)
    cd(answers.projectName)

    loader.log('Creating patatafile.js...')
    cp(path.join(exampleFolder, `/patatafile.js`), `patatafile.js`)

    loader.log('Creating features...')
    mkdir(`features`)

    loader.log('Creating components...')
    mkdir(`components`)
    mkdir(`components/android`)
    mkdir(`components/ios`)
    mkdir(`components/common`)
    cp(`${exampleFolder}/ui.android.js`, `./components/android/`)
    cp(`${exampleFolder}/ui.ios.js`, `./components/ios/`)
    cp(`${exampleFolder}/ui.common.js`, `./components/common/`)

    loader.log('Creating configurations...')
    mkdir(`config`)
    cp(`${exampleFolder}/config.js`, `./config/config.js`)

    loader.log('Creating jsconfig file...')
    cp(`${exampleFolder}/jsconfig.json`, `jsconfig.json`)

    loader.log('Creating README and LICENSE files...')
    cp(`${exampleFolder}/README.md`, `README.md`)
    cp(`${exampleFolder}/LICENSE.md`, `LICENSE.md`)

    loader.log('Init NPM')
    exec(`npm init -f`, {silent: true})

    loader.log('Installing Patata. This can take some minutes...')
    exec(`npm install --save patata`, {silent: true})
  }
}
