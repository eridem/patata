/* global before, describe */

const { join } = require('path')
const chai = require('chai')
chai.should()

const file = 'factory.js'
const target = require(join(__dirname, '../../../lib/modules/binary-provider', file))

describe(file, function () {
  before(function () {
    target({ })
  })
})
