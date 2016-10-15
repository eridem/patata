/* global describe, it */

const { join } = require('path')
const chai = require('chai')
chai.should()
const expect = chai.expect

const file = 'date-time.js'
const target = require(join(__dirname, '../../lib/modules/', file))

describe(file, function () {
  describe('using .dateTimeAsString()', function () {
    it('should return a date with yyyyMMdd_hhmmss format', function () {
      const date = target().dateTimeAsString()
      expect(date.match(/^\d\d\d\d\d\d\d\d_\d\d\d\d\d\d$/gi)).not.to.equal(null)
    })
  })
})
