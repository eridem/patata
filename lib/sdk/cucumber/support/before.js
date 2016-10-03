'use strict'
var patata = require('../../index')
var hooks = function () {
  this.Before(function (scenario) {
        // Init
    return patata.start(this, scenario)
  })
}
module.exports = hooks
