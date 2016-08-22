'use strict'

module.exports = function (argv, log, exampleFolder) {
  log.log('Create feature')

  return new Promise((resolve, reject) => {
    try {
      require('shelljs/global')
      const path = require('path')
      const extend = require('util')._extend
      const featuresPath = path.join(process.cwd(), '/features')

      if (!test('-d', featuresPath)) {
        reject('You must be on the root directory of a Patata project to run this command.')
      }

      const featureName = argv.feature.trim()
      const allFeaturesFolder = 'features'
      const featureFolderName = featureName.toLowerCase().replace(/\s/gi, '-').replace(/[^A-Zz-z0-9\-]/gi, '')
      const featurePath = path.join(process.cwd(), `${allFeaturesFolder}/${featureFolderName}`)

      log.log(`Creating folders and files for "${featureName}"`)
      mkdir('-p', featurePath)

      cp(path.join(exampleFolder, '/create-feature', '/feature-example.feature'), path.join(featurePath, `/${featureFolderName}.feature`))
      cp(path.join(exampleFolder, '/create-feature', '/feature-example.android.js'), path.join(featurePath, `/${featureFolderName}.android.js`))
      cp(path.join(exampleFolder, '/create-feature', '/feature-example.android.js'), path.join(featurePath, `/${featureFolderName}.ios.js`))
      log.log(`Feature created in ${featurePath}`)
      resolve()
    } catch (ex) {
      reject(ex)
    }
  })
}
