'use strict'

module.exports = function () {
  this.Given('_GIVEN_', {timeout: 5000}, function () {
    return this.emu
  })

  this.When('_WHEN_', {timeout: 5000}, function () {
    return this.emu
  })

  this.Then('_THEN_', {timeout: 5000}, function () {
    return this.emu
  })
}
