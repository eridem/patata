'use strict'

module.exports = function () {
  this.Given('I have installed Patata CLI', {timeout: 5000}, function () {
    // Access to the configuration if any
    console.log(this.config)

    // Each step needs to return a promise chained from this.emu
    return this.emu
      .MY_BUTTON.tap()
      .MY_FIELD.setText('Hello world')
  })

  this.When('I am in a terminal', {timeout: 5000}, function () {
    return this.emu
  })

  this.When('I use patata --"$clicommand" command', {timeout: 5000}, function (clicommand) {
    return this.emu
  })

  this.When('I use patata command', {timeout: 5000}, function (clicommand) {
    return this.emu
  })

  this.Then('I should have the following result: "$result"', {timeout: 5000}, function (result) {
    return this.emu
  })

  this.Then('I should see the help information', {timeout: 5000}, function (result) {
    return this.emu
  })
}
