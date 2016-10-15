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
    error: function () { _lastLogArgs = arguments },
    info: function () { _lastLogArgs = arguments }
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
  const fakeYargsWithVerbose = {argv: {verbose: true}}
  const fakeYargsWithoutVerbose = {argv: {verbose: true}}

  let opts = { console: fakeConsole, process: fakeProcess, colors: fakeColors, yargs: fakeYargsWithVerbose }

  before(() => {
    _lastLogArgs = null
    _wasExitCalled = false
    _targetModule = target(opts)
  })

  describe('using .logMessage()', function () {
    it('should return null if not message or description', function () {
      expect(_targetModule.logMessage()).to.equal(null)
    })

    it('should return message with prefix', function () {
      expect(_targetModule
        .logMessage('Message', null, fakeColors.gray, fakeColors.green, fakeColors.blue)).to.equal('[Patata] Message')
    })

    it('should return message and description with prefix', () => {
      expect(_targetModule
        .logMessage('Message', 'Description', fakeColors.gray, fakeColors.green, fakeColors.blue)).to.equal('[Patata] Message Description')
    })
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

  describe('using .debug()', function () {
    it('should return print a message', () => {
      let opts = { console: fakeConsole, process: fakeProcess, colors: fakeColors, yargs: fakeYargsWithoutVerbose }
      _targetModule = target(opts)

      _targetModule.debug('Message')
      _lastLogArgs[0].should.equal('[Patata] Message')
    })

    it('should not print if not message is passed', function () {
      expect(_targetModule.debug()).equal(null)
    })

    it('should return print a message', () => {
      _targetModule.debug('Message')
      _lastLogArgs[0].should.equal('[Patata] Message')
    })

    it('should return print a message and description', () => {
      _targetModule.debug('Message', 'Description')
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
