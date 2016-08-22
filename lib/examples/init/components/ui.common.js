'use strict'

module.exports = function () {
  const patata = require('patata')

  patata.components({
    DO_NOTHING: function () {
      return this
    }
  })
}
