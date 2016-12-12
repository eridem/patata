'use strict'

module.exports = function (dep) {
  const verify = function (platform) {
    const { log, help } = dep
    const requirements = dep.platform.requirements

    log.log('Verifying platform conditions...')

    const platformRequirement = requirements[platform]

      // Error if platform does not exists. Platform file need to start with "verify-*.js"
    if (!platformRequirement) {
      return help.errorDueNonExistingPlatform(platform)
    }

    platformRequirement.verify()
  }
  return {verify}
}
