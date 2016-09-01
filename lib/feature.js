/* global mkdir, cp, test */
'use strict'

function validate (opts) {
  let {validation, help} = opts
  if (!validation.isPatataRootDir(opts)) {
    help.errorDueRootPath(opts)
  }
  if (!validation.hasName(opts)) {
    help.errorDueName(opts)
  }
}

module.exports = function (opts) {
  let {validation, argv, log, examplePath} = opts
  validate(opts)
  log.log('Creating feature...')

  return new Promise((resolve, reject) => {
    try {
      const path = require('path')
      const featuresPath = path.join(process.cwd(), '/features')

      if (!test('-d', featuresPath)) {
        return reject('You must be on the root directory of a Patata project to run this command.')
      }

      const name = validation.formatName(argv.name)
      const allFeaturesFolder = 'features'
      const featurePath = path.join(process.cwd(), `${allFeaturesFolder}/${name}`)

      log.log(`Creating folders and files for "${name}"`)
      mkdir('-p', featurePath)

      cp(path.join(examplePath, '/create-feature', '/feature-example.feature'), path.join(featurePath, `/${name}.feature`))
      cp(path.join(examplePath, '/create-feature', '/feature-example.android.js'), path.join(featurePath, `/${name}.android.js`))
      cp(path.join(examplePath, '/create-feature', '/feature-example.ios.js'), path.join(featurePath, `/${name}.ios.js`))
      cp(path.join(examplePath, '/create-feature', '/feature-example.common.js'), path.join(featurePath, `/${name}.common.js`))

      log.log(`Feature created in ${featurePath}`)
      resolve()
    } catch (ex) {
      reject(ex)
    }
  })
}
