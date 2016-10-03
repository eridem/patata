'use strict'
class DefaultProvider {
  constructor (patata, opts) {
    this._patata = patata
    this._opts = opts
    if (!this._opts.path) {
      throw this.log.getError(`[Default provider] File cannot be null`)
    }
    return this
  }
  get log () { return this._patata.log }
  getBin () {
    return new Promise((resolve, reject) => {
      let file = this._opts.path
      resolve(file)
    })
  }
}
exports.DefaultProvider = DefaultProvider
