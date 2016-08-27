'use strict'

module.exports = {
  'by': {
    alias: 'b',
    demand: false,
    nargs: 2,
    type: 'string'
  },
  'ios': {
    alias: 'pi',
    demand: false,
    nargs: 0,
    describe: 'Used on "component". Add component only for iOS.',
    type: 'boolean'
  },
  'android': {
    alias: 'pa',
    demand: false,
    nargs: 0,
    describe: 'Used on "component". Add component only for Android.',
    type: 'boolean'
  },
  'common': {
    alias: 'pc',
    demand: false,
    nargs: 0,
    describe: 'Used on "component". Add component for all platforms.',
    type: 'boolean'
  },
  'loglevel': {
    alias: 'l',
    demand: false,
    nargs: 1,
    choices: ['verbose', 'debug', 'warning', 'error'],
    default: 'debug',
    describe: 'Set level of messages displayed on console.',
    type: 'string'
  },
  'help': {
    alias: 'h',
    demand: false,
    describe: 'Show this help',
    type: 'boolean'
  }
}
