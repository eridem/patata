'use strict'

module.exports = {
  'init': {
    demand: false,
    describe: 'Create new patata project',
    type: 'string'
  },
  'install': {
    alias: 'i',
    demand: false,
    describe: 'Install dependencies on an existing project',
    type: 'boolean'
  },
  'suite': {
    alias: 's',
    demand: false,
    describe: 'Run an specific suite',
    type: 'string'
  },
  'feature': {
    alias: 'f',
    demand: false,
    describe: 'Create a feature file structure and example',
    type: 'string'
  },
  'run-android': {
    alias: 'ra',
    demand: false,
    describe: 'Run tests on an Android device',
    type: 'string'
  },
  'run-ios': {
    alias: 'ri',
    demand: false,
    describe: 'Run tests on an iOS device',
    type: 'string'
  }
}
