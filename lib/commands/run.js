'use strict'

module.exports = function (dep) {
  let cmd = {}
  cmd.command = 'run <uri>'
  cmd.desc = 'Run test based on a file, uri or HockeyApp'
  cmd.builder = {
    'on-done': {
      alias: 'd',
      demand: false,
      nargs: 1,
      describe: 'Path to JavaScript file to execute when the test finish.',
      type: 'string'
    },
    'tags': {
      alias: 't',
      demand: false,
      describe: 'Run scenarios with those tags.\nRead "config.yml" using those tags (skip if --config-tags is used).',
      type: 'string'
    },
    'config-tags': {
      alias: 'ct',
      demand: false,
      describe: 'Read "config.yml" using those tags.',
      type: 'string'
    },
    'log-level': {
      alias: 'l',
      demand: false,
      default: 'warning',
      describe: 'Show more or less debug messages',
      type: 'string',
      choices: ['verbose', 'debug', 'warning', 'error']
    }
  }
  cmd.handler = function (argv) {
    const { log, binaryProvider, verifyAndroid, verifyIos, runGeneric } = dep
    log.log('Executing tests...')

    binaryProvider.getBinary(argv.uri).then(({platform, uri}) => {
      // Check conditions for the specific platform
      log.log('Verifying platform conditions...')
      const verifyPlatforms = { 'android': verifyAndroid, 'ios': verifyIos }
      verifyPlatforms[platform].verify()

      // Start the RUN
      log.log('Running Patata...')
      runGeneric.start(argv, uri, platform)
    }).catch(function (err) {
      log.exit(err)
    })
  }

  return cmd
}
