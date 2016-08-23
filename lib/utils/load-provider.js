'use strict'

module.exports = function (opts) {
  const path = require('path')
  require('shelljs/global')

  const { resolve, reject, argv, log, patata, platform, binary, tags, device } = opts

  // HockeyApp
  if (binary.toLowerCase().startsWith('hockeyapp:')) {
    const patataConfig = require(path.join(__dirname, '/patata-config.js')).get()
    const errorNotToken = new Error(`The file "patata.json" must contain the HockeyApp section: {"hockeyapp":{"token":"aaaabbbbccccdddd0000111122223333"}}`)
    const errorBadExpression = new Error(`The expressions must be similar to "hockeyapp:MyApp" or "hockeyapp:MyApp:filter(notes=/.*NOTE.*/gi)"`)
    const regexWithFilter = new RegExp('hockeyapp:([^:]+):filter\\(([^=]+)\\=([^\\)]+)+\\)', 'gi')
    const regexWithoutFilter = new RegExp('^hockeyapp:([^:]+)$')
    const regexForName = new RegExp('hockeyapp:([^])')
    const hasFilter = binary.match(regexWithFilter) !== null
    const hasTitle = binary.match(regexWithoutFilter) !== null

    if (!hasFilter && !hasTitle) {
      throw errorBadExpression
    }

    if (!patataConfig || !patataConfig.hockeyapp || !patataConfig.hockeyapp.token) {
      throw errorNotToken
    }

    log.log('Using HockeyApp:', binary)
    let filterGroups = regexWithFilter.exec(binary)
    let withoutFilterGroups = regexWithoutFilter.exec(binary)
    return {
      package: require('patata-provider-hockeyapp'),
      token: patataConfig.hockeyapp.token,
      app: hasFilter ? filterGroups[1] : withoutFilterGroups[1],
      extension: platform === 'android' ? 'apk' : 'ipa',
      versionFilter: hasFilter ? (v) => {
        let filterName = filterGroups[2]
        let filter = new RegExp(filterGroups[3], 'gi')
        let found = v && v[filterName] && v[filterName].match(filter)
        if (found) {
            log.log(`HockeyApp version found: ${v.version} - ${v.shortversion}`)
        }
        return found
      } : null
    }

  // URI
  } else {
    log.log('Using binary:', binary)

    return {
      path: binary
    }
  }
}
