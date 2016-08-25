
'use strict'

module.exports = function () {
  const patata = require('patata')

  patata.components({
    MY_BUTTON: function () {
      return this.elementById('my_button').should.eventually.exist
    }
  })
}