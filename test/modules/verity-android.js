/* global describe, it */

const { join } = require('path')
const chai = require('chai')
chai.should()
const expect = chai.expect

const file = 'verify-android.js'
const target = require(join(__dirname, '../../lib/modules/', file))

describe(file, function () {
  let targetModule
  let helpWasCalled = false

  let rightProcess = { env: { ANDROID_HOME: '/my/android/sdk' } }
  let wrongProcess = { env: { } }
  let help = {
    errorByAndroidHome: () => {
      helpWasCalled = true
    }
  }

  describe('using .verify()', function () {
    it('should throw errors if ANDROID_HOME is not defined', function () {
      targetModule = target({process: wrongProcess, help})
      targetModule.verify()
      expect(helpWasCalled).to.equal(true)
    })

    it('should not throw errors with valid configurations', function () {
      targetModule = target({process: rightProcess})
      targetModule.verify()
    })
  })
})
