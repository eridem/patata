'use strict'

module.exports = {
  'init': {
    alias: 'i',
    demand: false,
    describe: 'Create new patata project',
    type: 'string'
  },
  /*'run': {
    alias: 'r',
    demand: false,
    describe: 'Run a custom suite. Other arguments are optional or it will question them.',
    type: 'void'
  },*/
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
