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

  const hasOne = () => {
    return get().length === 1
  }

  return {get, hasAny, hasOne}
}
