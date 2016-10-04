'use strict'

// Cucumber hooks
// More info: https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/hooks.md

var hooks = function () {
  this.Before(function (scenario) {
    return this.emu
  })

  this.After(function (scenario) {
    return this.emu
  })
}

module.exports = hooks
