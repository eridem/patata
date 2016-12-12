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
  let androidPlatformVerification = {
    verify: () => {
      lastInput = 'android'
    }
  }
  let iOSPlatformVerification = {verify: () => {
    lastInput = 'ios'
  }
  }
  let log = {log: () => {}}
  let help = {
    errorDueNonExistingPlatform: (platform) => {
      lastInput = platform
      raisedError = true
    }
  }

  before(function () {
    lastInput = null
    raisedError = false
    targetModule = target({ help, log, platform: { requirements: { android: androidPlatformVerification, ios: iOSPlatformVerification } } })
  })

  describe('using .verify()', function () {
    it('should verify Android if this is the selected platform', function () {
      targetModule.verify('android')
      expect(lastInput).to.equal('android')
      expect(raisedError).to.equal(false)
    })

    it('should verify iOS if this is the selected platform', function () {
      targetModule.verify('ios')
      expect(lastInput).to.equal('ios')
      expect(raisedError).to.equal(false)
    })

    it('should raise error if platform does not exists', function () {
      targetModule.verify('patatarama')
      expect(raisedError).to.equal(true)
    })
  })
})
