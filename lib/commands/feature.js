'use strict'

module.exports = function (dep) {
  function render (template, literals) {
    const GRAVE_ACCENT = '`'
    return eval(Object.keys(literals).map(function (literal) {
      return 'const ' + literal + ' = "' + literals[literal] + '";'
    }).join('\n') + GRAVE_ACCENT + template.replace(GRAVE_ACCENT, '') + GRAVE_ACCENT)
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
    const featuresPath = join(process.cwd(), '/features')
    if (!shell.test('-d', featuresPath)) {
      throw new Error('You must be on the root directory of a Patata project to run this command.')
    }
    const name = validation.formatName(argv.name)
    const tag = validation.formatTag(argv.name)
    const title = validation.formatTitle(argv.name)
    const allFeaturesFolder = 'features'
    const featurePath = join(process.cwd(), allFeaturesFolder, name)
    const templatePath = join(__rootdirname, 'lib/scaffolding/create-feature')
    const extensions = ['.feature', '.android.js', '.ios.js', '.common.js']
    const literals = {
      tag: tag,
      title: title
    }
    log.log(`Creating folders and files for "${name}"`)
    shell.mkdir('-p', featurePath)

    extensions.forEach(function (ext) {
      let fromPath = join(templatePath, `/feature-example${ext}`)
      let toPath = join(featurePath, `/${name}${ext}`)
      let template = fs.readFileSync(fromPath, {encoding: 'utf8'})
      let content = render(template, literals)
      fs.writeFileSync(toPath, content, {encoding: 'utf8'})
    })

    log.log(`Feature created in ${featurePath}`)
  }

  return cmd
}
