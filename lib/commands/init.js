'use strict'

module.exports = function (dep) {
  let cmd = {}
  cmd.command = 'init <name>'
  cmd.desc = 'Create a new project'
  cmd.handler = function (argv) {
    let { validation, join, process, fs, log, shell, __rootdirname } = dep

    log.log('Init Patata project')

    const name = validation.formatName(argv.name)
    const targetFolder = join(process.cwd(), name)
    const packageJsonPath = join(targetFolder, '/package.json')
    log.log('Creating project in', `"${targetFolder}"...`)

    // Copy all information
    shell.mkdir('-p', targetFolder)
    shell.cp('-Rf', join(__rootdirname, 'lib/scaffolding/init') + '/*', targetFolder)
    shell.cp('-Rf', join(__rootdirname, 'lib/scaffolding/init/patata.yml'), targetFolder)
    shell.cp('-Rf', join(__rootdirname, 'README.md'), targetFolder)

    // Change name
    log.log('Modifying', `"${packageJsonPath}"...`)
    let packageJson = require(packageJsonPath)
    packageJson.name = name
    packageJson = JSON.stringify(packageJson, null, 2)

    log.log('Saving files...')
    fs.writeFileSync(packageJsonPath, packageJson)
    log.log('Done!')
  }

  return cmd
}
