/* global before, describe, it */

const { join } = require('path')
const chai = require('chai')
chai.should()
const expect = chai.expect

const file = '/lib/modules/binary-provider/factory.js'
const target = require(join(__dirname, '../../..', file))

describe(file, function () {
  let targetModule

  // Mock helpers
  let raisedError
  let lastInput

  // Mocked modules
  let log = {log: () => {}, exit: () => { raisedError = true }}
  let url = {parse: (uri) => { return { protocol: uri } }}

  let binaryProviderHttp = { getAsync: (uri) => { lastInput = uri + '_HTTP' } }
  let binaryProviderDummy = { getAsync: (uri) => { lastInput = uri + '_DUMMY' } }

  before(function () {
    lastInput = null
    raisedError = false
  })

  describe('using getBinary()', function () {
    it('should return a protocol that exists', function () {
      targetModule = target({ log, url, binaryProvider: { binaryProviderHttp, binaryProviderDummy } })

      targetModule.getBinary('dummy')
      lastInput.should.equal('dummy_DUMMY')
      expect(raisedError).to.equal(false)
    })

    it('should use protocol HTTP with HTTP and HTTPS', function () {
      targetModule = target({ log, url, binaryProvider: { binaryProviderHttp, binaryProviderDummy } })

      targetModule.getBinary('http')
      lastInput.should.equal('http_HTTP')
      expect(raisedError).to.equal(false)

      targetModule.getBinary('https')
      lastInput.should.equal('https_HTTP')
      expect(raisedError).to.equal(false)
    })

    it('should return an error if the protocol does not exist', function () {
      targetModule = target({ log, url, binaryProvider: { binaryProviderHttp, binaryProviderDummy } })
      targetModule.getBinary('patatarama')
      expect(raisedError).to.equal(true)
    })
  })
})
