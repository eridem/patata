'use strict'

module.exports = function (opts) {
  const {argv} = opts
  const get = () => {
    const platforms = []
    if (argv.ios) platforms.push('ios')
    if (argv.android) platforms.push('android')
    if (argv.common) platforms.push('common')
    return platforms
  }

  const hasAny = () => {
    return get().length > 0
  }

  return { get, hasAny }
}
