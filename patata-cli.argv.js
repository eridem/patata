'use strict'

module.exports = {
  'init': {
    alias: 'i',
    demand: false,
    describe: 'Create new patata project',
    type: 'string'
  },
  'suite': {
    alias: 's',
    demand: false,
    describe: 'Run an specific suite',
    type: 'string'
  },
  'create-suite': {
    demand: false,
    describe: 'Absolute path to the aapt executable',
    type: 'string'
  }
}
