/* global before, describe, it */

const { join } = require('path')
const chai = require('chai')
chai.should()

const file = 'binary-provider-http.js'
const target = require(join(__dirname, '../../../lib/modules/binary-provider', file))

describe(file, function () {
  let targetModule

  before(function () {
    targetModule = target({ })
  })

  describe('using getAsync()', function () {
    it('Should use Android if URL points to Android app', function (done) {
      let testUrl = 'http://example.com/myapp.aPk'
      targetModule.getAsync(testUrl).then((result) => {
        result.platform.should.equal('android')
        result.binary.should.equal(testUrl)
        done()
      })
    })
    it('Should use iOS if URL points to iPhone app', function (done) {
      let testUrl = 'http://example.com/myapp.iPa'
      targetModule.getAsync(testUrl).then((result) => {
        result.platform.should.equal('ios')
        result.binary.should.equal(testUrl)
        done()
      })
    })
  })
})
