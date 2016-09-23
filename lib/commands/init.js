'use strict'

module.exports = function (dep) {
  function install (name, version) {
    const { join, process, fs, log, shell, __rootdirname } = dep

    try {
      const targetFolder = join(process.cwd(), name)
      const packageJsonPath = join(targetFolder, '/package.json')
      log.log('Creating project in', `"${targetFolder}"...`)

      // Copy all information
      shell.mkdir('-p', targetFolder)
      shell.cp('-Rf', join(__rootdirname, 'lib/scaffolding/init') + '/*', targetFolder)
      shell.cp('-Rf', join(__rootdirname, 'lib/scaffolding/init/.patata.yml'), targetFolder)
      shell.cp('-Rf', join(__rootdirname, 'README.md'), targetFolder)

      // Change name and Patata version
      log.log('Modifying', `"${packageJsonPath}"...`)
      let packageJson = require(packageJsonPath)
      packageJson.name = name
      packageJson.dependencies = { patata: `^${version}` }
      packageJson = JSON.stringify(packageJson, null, 2)

      log.log('Saving files...')
      fs.writeFileSync(packageJsonPath, packageJson)
      log.log('Done!')
    } catch (ex) {
      log.exit(['There was an error creating the project'])
    }
  }

  let cmd = {}
  cmd.command = 'init <name>'
  cmd.desc = 'Create a new project'
  cmd.handler = function (argv) {
    let { latestVersion, validation, log, help } = dep

    log.log('Init Patata project')
    const name = validation.formatName(argv.name)

    latestVersion.get().then((version) => {
      log.log(`Using Patata version ${version}`)
      install(name, version)
    }).catch(help.errorDueCannotObtainPatataVersion)
  }
  return cmd
}
