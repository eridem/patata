/* global describe, it */

require('chai').should()
const target = require('../../lib/utils/platform')

describe('platform.js', function () {
  describe('using .get()', function () {
    it('should return true if one platform is indicated', function () {
      const targetModule = target({ argv: { ios: true } })
      targetModule.hasAny().should.equal(true)
    })

    it('should return true if several platforms are indicated', function () {
      const targetModule = target({ argv: { ios: true, android: true, commont: true } })
      targetModule.hasAny().should.equal(true)
    })

    it('should return false if no platform is indicated', function () {
      const targetModule = target({ argv: { } })
      targetModule.hasAny().should.equal(false)
    })
  })

  describe('using .get()', function () {
    it('should return empty array if not platform specified', function () {
      const targetModule = target({ argv: { } })
      const platforms = targetModule.get()
      platforms.should.have.length(0)
    })

    it('should return iOS is it is indicated', function () {
      const targetModule = target({ argv: { ios: true } })
      const platforms = targetModule.get()
      platforms.should.have.length(1)
      platforms.should.include('ios')
    })
    it('should return Android is it is indicated', function () {
      const targetModule = target({ argv: { android: true } })
      const platforms = targetModule.get()
      platforms.should.have.length(1)
      platforms.should.include('android')
    })
    it('should return Common is it is indicated', function () {
      const targetModule = target({ argv: { common: true } })
      const platforms = targetModule.get()
      platforms.should.have.length(1)
      platforms.should.include('common')
    })
    it('should return several platforms if it is indicated', function () {
      const targetModule = target({ argv: { common: true, ios: true, android: true } })
      const platforms = targetModule.get()
      platforms.should.have.length(3)
      platforms.should.include('ios')
      platforms.should.include('android')
      platforms.should.include('common')
    })
  })
})
