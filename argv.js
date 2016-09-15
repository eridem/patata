'use strict'

module.exports = {
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
  'on-done': {
    alias: 'd',
    demand: false,
    nargs: 1,
    describe: 'A path to a JavaScript file to execute when the test finish.',
    type: 'string'
  },
  'tags': {
    alias: 't',
    demand: false,
    describe: 'Used on "run".\nRun scenarios with those tags.\nRead "config.yml" using those tags (skip if --config-tags is used).',
    type: 'string'
  },
  'config-tags': {
    alias: 'ct',
    demand: false,
    describe: 'Used on "run".\nRead "config.yml" using those tags.',
    type: 'string'
  }
}
