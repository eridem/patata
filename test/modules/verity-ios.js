/* global before, describe, it */

const { join } = require('path')
const chai = require('chai')
chai.should()

const file = 'verify-ios.js'
const target = require(join(__dirname, '../../lib/modules/', file))

describe(file, function () {
  let targetModule

  before(function () {
    targetModule = target({ })
  })

  describe('using .verify()', function () {
    it('should not throw errors with valid configurations', function () {
      targetModule.verify()
    })
  })
})
