'use strict'

const path = require('path')
module.exports = function (argv, log, exampleFolder) {
  log.log('Running...')

  return new Promise((resolve, reject) => {
    try {
      // Possible arguments
      let possibleArguments = {
        id: argv.byId,
        contentDescription: argv.byContentDescription,
        className: argv.byClassName,
        xPath: argv.byXPath
      }
      let platform = 'common'

      return require(path.join(__dirname, 'component-create.js'))({argv, log, exampleFolder, platform, possibleArguments, resolve, reject});
    } catch (ex) {
      return reject(ex)
    }
  })
}
