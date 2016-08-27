/* global exec */
'use strict'

function validate (opts) {
  let {validation, help} = opts
  if (!validation.isPatataRootDir(opts)) {
    help.errorDueRootPath(opts)
  }
}

module.exports = function (opts) {
  let {log, help} = opts
  validate(opts)
  log.log('Installing. This may take few minutes...')

  return new Promise((resolve, reject) => {
    try {
      if (!process.env.JAVA_HOME) {
        log.warn(help.jdk)
      }

      if (exec('npm install', {silent: true}).code !== 0) {
        return reject('There was a problem installing.')
      } else {
        return resolve()
      }
    } catch (ex) {
      reject(ex)
    }
  })
}
