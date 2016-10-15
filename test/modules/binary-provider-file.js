/* global before, describe */

const { join } = require('path')
const chai = require('chai')
chai.should()

const file = 'binary-provider-file.js'
const target = require(join(__dirname, '../../lib/modules/', file))

describe(file, function () {
  before(function () {
    target({ })
  })
})
