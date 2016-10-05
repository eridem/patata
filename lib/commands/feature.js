'use strict'

module.exports = function (dep) {

  function render(template, literals) {
    return eval('const {'
      + Object.keys(literals)
      + '} = ' + JSON.stringify(literals)
      + '`' + template + '`')
  }

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
    let { validation, log, shell, join, process, __rootdirname, fs, Mustache, changeCase, latinize } = dep
    validate()
    log.log('Creating feature...')
    try {
      const featuresPath = join(process.cwd(), '/features')
      if (!shell.test('-d', featuresPath)) {
        throw 'You must be on the root directory of a Patata project to run this command.'
      }

      const name = validation.formatName(argv.name)
      const tag = validation.formatTag(argv.name)
      const title = validation.formatTitle(argv.name)
      const allFeaturesFolder = 'features'
      const featurePath = join(process.cwd(), allFeaturesFolder, name)
      const templatePath = join(__rootdirname, 'lib/scaffolding/create-feature')
      const extensions = ['.feature', '.android.js', '.ios.js', '.common.js']
      const literals = {
        name: name,
        tag: tag,
        title: title
      }
      log.log(`Creating folders and files for "${name}"`)
      shell.mkdir('-p', featurePath)

      extensions.forEach(function (ext) {
        let fromPath = join(templatePath, `/feature-example${ext}`)
        let toPath = join(featurePath, `/${name}${ext}`)
        let template = fs.readFileSync(fromPath, {encoding : 'utf8'})
        let content = render(template, literals)
        console.log(content)
        fs.writeFileSync(toPath, content, {encoding : 'utf8'})
      })

      log.log(`Feature created in ${featurePath}`)
    } catch (ex) {
      log.exit(ex)
    }
  }

  return cmd
}
