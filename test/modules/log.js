/* global describe, it, before */

const { join } = require('path')
const chai = require('chai')
chai.should()
const expect = chai.expect

const file = 'log.js'
const target = require(join(__dirname, '../../lib/modules/', file))

describe(file, function () {
  let _targetModule
  let _lastLogArgs
  let _wasExitCalled

  const fakeConsole = {
    log: function () { _lastLogArgs = arguments },
    warn: function () { _lastLogArgs = arguments },
    error: function () { _lastLogArgs = arguments }
  }
  const fakeColors = {
    gray: (m) => m,
    green: (m) => m,
    blue: (m) => m,
    yellow: (m) => m,
    red: (m) => m
  }
  const fakeProcess = {
    exit: () => {
      _wasExitCalled = true
    }
  }
  let opts = { console: fakeConsole, process: fakeProcess, colors: fakeColors }

  before(() => {
    _lastLogArgs = null
    _wasExitCalled = false
    _targetModule = target(opts)
  })

  describe('using .log()', function () {
    it('should not print if not message is passed', function () {
      expect(_targetModule.log()).equal(null)
    })

    it('should return print a message', () => {
      _targetModule.log('Message')
      _lastLogArgs[0].should.equal('[Patata] Message')
    })

    it('should return print a message and description', () => {
      _targetModule.log('Message', 'Description')
      _lastLogArgs[0].should.equal('[Patata] Message Description')
    })
  })

  describe('using .warn()', function () {
    it('should not print if not message is passed', function () {
      expect(_targetModule.warn()).equal(null)
    })

    it('should return print a message', () => {
      _targetModule.warn('Message')
      _lastLogArgs[0].should.equal('[Patata] Message')

      _targetModule.warn(['Message'])
      _lastLogArgs[0].should.equal('[Patata] Message')
    })
  })

  describe('using .exit()', function () {
    it('should not print if not message is passed', function () {
      expect(_targetModule.exit()).equal(null)
    })

    it('should return print a message and called process.exit', () => {
      _targetModule.exit('Message')
      _lastLogArgs[0].should.equal('[Patata]')
      _lastLogArgs[1].should.equal('Message')
      expect(_wasExitCalled).to.equal(true)

      _wasExitCalled = false
      _targetModule.exit(['Message'])
      _lastLogArgs[0].should.equal('[Patata]')
      _lastLogArgs[1].should.equal('Message')
      expect(_wasExitCalled).to.equal(true)
    })
  })
})
