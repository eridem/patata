'use strict'

module.exports = function(opts) {
    const path = require('path')
    require('shelljs/global')

    const { resolve, reject, argv, log, patata, platform, binary, tags, device } = opts;

    // HockeyApp
    if (binary.toLowerCase().startsWith('hockeyapp:')) {
        const errorNotToken = new Error(`The file ${hockeyappJsonPath} must exists with the HockeyApp token: { "token": "aaaabbbbccccdddd0000111122223333" }`)
        const errorBadExpression = new Error(`The expressions must be similar to "hockeyapp:MyApp" or "hockeyapp:MyApp:filter(notes=/.*NOTE.*/gi)"`)
        const regexWithFilter = new RegExp('hockeyapp:[^:]+:filter\\(([^=]+)\\=([^\\)]+)+\\)', 'gi');
        const regexWithoutFilter = new RegExp('^hockeyapp:([^:]+)$')
        const regexForName = new RegExp('hockeyapp:([^])')
        const hasFilter = binary.match(regexWithFilter)
        const hasTitle = binary.match(regexWithoutFilter)

        if (!hasFilter && !hasTitle) {
            throw errorBadExpression
        }

        const hockeyappJsonPath = path.join(process.cwd(), '/config/providers/hockeyapp.json')

        if (!test('-e', hockeyappJsonPath)) {
            throw errorNotToken
        }

        let hockeyappJson = require(hockeyappJsonPath)
        if (!hockeyappJson.token) {
            throw errorNotToken
        }

        log.log('Using HockeyApp:', binary)
        return {
            package: require('patata-provider-hockeyapp'),
            token: hockeyappJson.token,
            app: hasFilter ? regexWithFilter.exec(binary)[1] : regexWithoutFilter.exec(binary)[1],
            extension: platform === 'android' ? 'apk' : 'ipa',
            versionFilter: hasFilter ? (v) => { return v.name.match(new RegExp(regexWithFilter.exec(binary)[2])) } : null
        }

    // URI
    } else {
        log.log('Using binary:', binary)

        return {
            path: binary
        }
    }
}