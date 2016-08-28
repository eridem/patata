'use strict'

const url = require('url')
const querystring = require('querystring')
const HockeyApp = require('hockeyapp-api-wrapper')

module.exports = function (opts) {
  const { log, argv, setting, help } = opts
  log.log('Using HockeyApp...')

  return new Promise((resolve, reject) => {
    const patataSettings = setting.get()
    const fullUrl = url.parse(argv.name)
    const hockeyAppArguments = querystring.parse(fullUrl.query)
    let hockeyAppName = null
    let hockeyAppId = null
    let filterName = null
    let filterValue = null

    for (var attr in hockeyAppArguments) {
      let attrCmp = attr.toLowerCase()
      if (attrCmp === 'name') {
        hockeyAppName = hockeyAppArguments[attr]
      } else if (attrCmp === 'id') {
        hockeyAppId = hockeyAppArguments[attr]
      } else if (attrCmp === 'filtername') {
        filterName = hockeyAppArguments[attr]
      } else if (attrCmp === 'filtervalue') {
        filterValue = hockeyAppArguments[attr]
      }
    }

    if (!patataSettings || !patataSettings.HockeyApp || !patataSettings.HockeyApp.Token) {
      help.errorDueConfigDoesNotContainHockeyAppToken()
    }
    if (hockeyAppName === null && hockeyAppId === null) {
      help.errorDueNotHockeyAppName(opts)
    }
    if ((filterName === null || filterName === '') !== (filterValue === null || filterValue === '')) { // !XOR condition
      help.errorDueMalformedHockeyAppFilter(opts)
    }

    let filterFn = null
    if (filterName && filterValue) {
      filterFn = (v) => {
        let filter = new RegExp(filterValue, 'gi')
        let found = v && v[filterName] && v[filterName].match(filter)
        return found
      }
    }

    log.log(`[HockeyApp]`, 'Obtaining HockeyApp download url...')
    const hockeyAppCli = new HockeyApp.Client(patataSettings.HockeyApp.Token)

    hockeyAppCli.getApps().then(function (appsResponse) {
      if (appsResponse.errors) {
        return reject(`[HockeyApp] ${JSON.stringify(appsResponse.errors)}`)
      }

      let app = null
      if (hockeyAppId) {
        app = HockeyApp.Utils.getAppByIdMatch(appsResponse, hockeyAppId)
      } else if (hockeyAppName) {
        app = HockeyApp.Utils.getAppByTitleMatch(appsResponse, hockeyAppName)
      }

      const platform = app.platform.toLowerCase()
      log.log(`[HockeyApp]`, `Found ${app.platform} application!`)

      hockeyAppCli.getVersions(app).then(function (versionResponse) {
        let version = null

        if (filterFn) {
          version = HockeyApp.Utils.getAppByVersionFilter(versionResponse, filterFn)
        } else {
          version = HockeyApp.Utils.getLatestVersion(versionResponse)
        }

        if (!version) {
          return reject(`[HockeyApp] Latest version of the app not found`)
        }

        let binary = hockeyAppCli.getLatestAndroidVersionDownloadLink(app, version, platform === 'android' ? 'apk' : 'ipa')

        log.log(`[HockeyApp]`, `Using: "${version.title} | ${version.shortversion}"`)
        log.log(`[HockeyApp]`, `Url: ${binary}`)
        resolve({platform, binary})
      }).catch(reject)
    }).catch(reject)
  })
}
