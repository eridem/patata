'use strict'

module.exports = function (opts, loader) {
  require('shelljs/global')

const cliSpinners = require('cli-spinners');
  const extend = require('util')._extend
  const inquirer = require('inquirer')
  const colors = require('colors')

  if (!opts.init) {
    var answers = {}
    inquirer.prompt({
      type: 'input',
      name: 'projectName',
      message: 'Project Name:'
    }).then(function (value) {
      answers = extend(answers || {}, value)
      install(new Loader(), answers)
    })
  } else {
    install(new Loader(), {projectName: opts.init})
  }

  function install (loader, answers) {
    loader.start('Creating project folder...')
    mkdir(answers.projectName)
    cd(answers.projectName)

    loader.start('Creating patatafile.js...')
    touch(`patatafile.js`)
    loader.stop()

    loader.start('Creating features...')
    mkdir(`features`)
    loader.stop()

    loader.start('Creating components...')
    mkdir(`components`)
    mkdir(`components/android`)
    mkdir(`components/ios`)
    mkdir(`components/common`)
    loader.stop()

    loader.start('Creating configurations...')
    mkdir(`config`)
    loader.stop()

    loader.start('Creating other files...')
    touch(`README.md`)
    touch(`LICENSE.md`)
    loader.stop()

    loader.start('Init NPM')
    exec(`npm init -f`, {silent: true})
    loader.stop()

    loader.start('Installing Patata. This can take some minutes...')
    exec(`npm install --save patata`, {silent: true})
    loader.stop()
  }
}
