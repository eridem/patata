/* global before, describe, it */

const { join } = require('path')
const chai = require('chai')
chai.should()
const expect = chai.expect

const file = '/lib/modules/platform/requirements/factory.js'
const target = require(join(__dirname, '../../../..', file))

describe(file, function () {
  let targetModule

  // Mock helpers
  let raisedError
  let lastInput

  // Mocked modules
  let log = {log: () => {}}
  let help = {
    errorDueNonExistingPlatform: (platform) => {
      lastInput = platform
      raisedError = true
    }
  }
  let dummyPlatform = {
    verify: () => {
      lastInput = 'dummyPlatform'
    }
  }

  before(function () {
    lastInput = null
    raisedError = false
    targetModule = target({ help, log, platform: { requirements: { dummyPlatform } } })
  })

  describe('using .verify()', function () {
    it('should verify DummyPlatform if this is the selected platform', function () {
      targetModule.verify('dummyPlatform')
      expect(lastInput).to.equal('dummyPlatform')
      expect(raisedError).to.equal(false)
    })

    it('should raise error if platform does not exists', function () {
      targetModule.verify('patatarama')
      expect(raisedError).to.equal(true)
    })
  })
})
