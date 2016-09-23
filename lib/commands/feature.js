'use strict'

module.exports = function (dep) {
  function validate () {
    let {validation, help} = dep
    if (!validation.isPatataRootDir()) {
      help.errorDueRootPath()
    }
  }

  let cmd = {}

  cmd.command = 'feature <name>'
  cmd.desc = 'Create the needed files for a new feature'
  cmd.handler = function (argv) {
    let { validation, log, shell, join, process, __rootdirname } = dep
    validate()
    log.log('Creating feature...')

    return new Promise((resolve, reject) => {
      try {
        const featuresPath = join(process.cwd(), '/features')

        if (!shell.test('-d', featuresPath)) {
          return reject('You must be on the root directory of a Patata project to run this command.')
        }

        const name = validation.formatName(argv.name)
        const allFeaturesFolder = 'features'
        const featurePath = join(process.cwd(), `${allFeaturesFolder}/${name}`)

        log.log(`Creating folders and files for "${name}"`)
        shell.mkdir('-p', featurePath)

        shell.cp(join(__rootdirname, 'lib/scaffolding/create-feature', '/feature-example.feature'), join(featurePath, `/${name}.feature`))
        shell.cp(join(__rootdirname, 'lib/scaffolding/create-feature', '/feature-example.android.js'), join(featurePath, `/${name}.android.js`))
        shell.cp(join(__rootdirname, 'lib/scaffolding/create-feature', '/feature-example.ios.js'), join(featurePath, `/${name}.ios.js`))
        shell.cp(join(__rootdirname, 'lib/scaffolding/create-feature', '/feature-example.common.js'), join(featurePath, `/${name}.common.js`))

        log.log(`Feature created in ${featurePath}`)
        resolve()
      } catch (ex) {
        reject(ex)
      }
    })
  }

  return cmd
}
