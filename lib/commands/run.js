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
    'device': {
      alias: 'm',
      demand: false,
      describe: 'Set device to run the test.',
      type: 'string'
    }
  }
  cmd.handler = function (argv) {
    const { log, binaryProvider, verifyAndroid, verifyIos, runGeneric } = dep
    log.log('Executing tests...')

    binaryProvider.factory.getBinary(argv.uri).then(({platform, binary}) => {
      // Check conditions for the specific platform
      log.log('Verifying platform conditions...')
      const verifyPlatforms = { 'android': verifyAndroid, 'ios': verifyIos }
      verifyPlatforms[platform].verify()

      if (argv.device) {
        log.debug('Run on device', argv.device)
      }

      // Start the RUN
      log.log('Running Patata...')
      runGeneric.start(argv, binary, platform, argv.device)
    }).catch(function (err) {
      log.exit(err)
    })
  }

  return cmd
}
