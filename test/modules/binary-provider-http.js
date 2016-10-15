/* global before, describe */

const { join } = require('path')
const chai = require('chai')
chai.should()

const file = 'binary-provider-http.js'
const target = require(join(__dirname, '../../lib/modules/', file))

describe(file, function () {
  before(function () {
    target({ })
  })
})
