'use strict'

module.exports = {
  'init': {
    demand: false,
    nargs: 0,
    describe: 'Create new patata project.',
    type: 'string'
  },
  'install': {
    alias: 'i',
    demand: false,
    nargs: 0,
    describe: 'Install dependencies on an existing project.',
    type: 'boolean'
  },
  'feature': {
    alias: 'f',
    demand: false,
    nargs: 1,
    describe: 'Create a feature file structure and example.',
    type: 'string'
  },
  'component': {
    alias: 'c',
    demand: false,
    nargs: 1,
    describe: 'Create a new component.',
    type: 'string'
  },
  'run': {
    alias: 'r',
    demand: false,
    nargs: 1,
    describe: 'Run test based on a file, uri or HockeyApp.',
    type: 'string'
  },
  '-set-setting': {
    alias: 's',
    demand: false,
    nargs: 2,
    describe: 'Set global settings on the ".patata.yml"',
    type: 'string'
  },
  'by': {
    demand: false,
    nargs: 2,
    type: 'string'
  },
  'ios': {
    demand: false,
    nargs: 0,
    describe: 'In combination with other commands, specify it is only iOS related',
    type: 'boolean'
  },
  'android': {
    demand: false,
    nargs: 0,
    describe: 'In combination with other commands, specify it is only Android related',
    type: 'boolean'
  },
  'common': {
    demand: false,
    nargs: 0,
    describe: 'In combination with other commands, specify it is all platforms related',
    type: 'boolean'
  },
  'log-type': {
    demand: false,
    nargs: 1,
    choices: ['verbose', 'debug', 'warning'],
    default: 'debug',
    describe: 'Set level of messages displayed on console.',
    type: 'string'
  }
}
