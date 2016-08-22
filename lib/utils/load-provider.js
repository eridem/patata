'use strict'

module.exports = function(opts) {
    const path = require('path')
    require('shelljs/global')

    const { resolve, reject, argv, log, patata, platform, binary, tags, device } = opts;

    // HockeyApp
    if (binary.toLowerCase().startsWith('hockeyapp:')) {
        const error = new Error(`The file ${hockeyappJsonPath} must exists with the HockeyApp token: { "token": "aaaabbbbccccdddd0000111122223333" }`)
        const hockeyappJsonPath = path.join(process.cwd(), '/providers/hockeyapp.json')

        if (!test('-e', hockeyappJsonPath)) {
            throw error
        }

        let hockeyappJson = require(hockeyappJsonPath)
        if (!hockeyappJson.token) {
            throw error
        }
        
        return {
            package: require('patata-provider-hockeyapp'),
            token: hockeyappJson.token,
            app: binary.replace(/hockeyapp:/gi, ''),
            extension: platform === 'android' ? 'apk' : 'ipa'
        }

    // URI
    } else {
        return {
            path: binary
        }
    }
}