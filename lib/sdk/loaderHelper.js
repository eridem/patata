'use strict'
class LoaderHelper {
  loadAsFunctionModuleOrObject (what) {
    if (typeof what === 'function') {
      return what()
    } else if (typeof what === 'string') {
      return require(what)
    }
    return what
  }
  obtainPlugin (what) {
    if (typeof what === 'string') {
      var objs = require(what)
      for (var attr in objs) {
        what = objs[attr]
      }
    }
    return what
  }
}
exports.LoaderHelper = LoaderHelper
