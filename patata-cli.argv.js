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
  'feature': {
    alias: 'f',
    demand: false,
    describe: 'Create a feature file structure and example',
    type: 'string'
  }
}
