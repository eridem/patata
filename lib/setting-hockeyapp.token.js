'use strict'

module.exports = function (opts) {
  const {log, help, setting, argv} = opts

  log.log('HockeyApp Token...')

  return new Promise((resolve, reject) => {
    try {
      let patataConfigObj = setting.get() || {}

      const value = argv.value

      if (value) {
        patataConfigObj.HockeyApp = { Token: value }
        setting.set(patataConfigObj)
        resolve()
      } else if (patataConfigObj.HockeyApp && patataConfigObj.HockeyApp.Token) {
        resolve(`HockeyApp.Token = ${patataConfigObj.HockeyApp.Token}`)
      } else {
        help.errorDueHockeyAppTokenNotExists(opts)
      }
    } catch (ex) {
      reject(ex)
    }
  })
}
