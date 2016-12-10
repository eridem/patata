/* global describe, it */

const { join } = require('path')
const chai = require('chai')
chai.should()

const file = 'validation.js'
const target = require(join(__dirname, '../../lib/modules/', file))

describe(file, function () {
  let targetModule

  const fakeCwd = '/my/path/'
  const fakeJoin = function () {
    return Object.keys(arguments).map(k => arguments[k]).toString()
  }
  const fakeProcess = { cwd: () => fakeCwd }
  const fakeTestShell = { test: () => true }
  const fakeSettingsStoragePath = { storagePath: () => fakeCwd }

  describe('using .configDirPath()', function () {
    it('should return config dir path', function () {
      targetModule = target({ join: fakeJoin, process: fakeProcess })

      targetModule.configDirPath().should.equal([fakeCwd, '/config'].toString())
    })
  })

  describe('using .configPath()', function () {
    it('should return config dir path', function () {
      targetModule = target({ join: fakeJoin, process: fakeProcess })

      targetModule.configPath().should.equal([fakeCwd, '/config', '/config.yml'].toString())
    })
  })

  describe('using .formatName()', function () {
    it('should format empty texts', function () {
      targetModule = target({ })

      targetModule.formatName(null).should.equal('')
      targetModule.formatName(undefined).should.equal('')
      targetModule.formatName('').should.equal('')
      targetModule.formatName('  ').should.equal('')
    })
    it('should format texts with only symbols', function () {
      targetModule = target({ })

      targetModule.formatName(' ! _ ! ').should.equal('')
      targetModule.formatName('&&').should.equal('')
      targetModule.formatName('\\').should.equal('')
    })
    it('should format texts with spaces only', function () {
      targetModule = target({ })

      targetModule.formatName('pataTa').should.equal('patata')
      targetModule.formatName('paTAta rama').should.equal('patata-rama')
      targetModule.formatName(' patata ').should.equal('patata')
      targetModule.formatName('   pataTA raMa ').should.equal('patata-rama')
      targetModule.formatName(' paTAta_-_ ').should.equal('patata')
      targetModule.formatName('   patAta-rama ').should.equal('patata-rama')
      targetModule.formatName('   pAtAta-_rama ').should.equal('patata-rama')
    })
  })

  describe('using .isPatataRootDir()', function () {
    it('should return config dir path', function () {
      targetModule = target({ shell: fakeTestShell, setting: fakeSettingsStoragePath })

      targetModule.isPatataRootDir().should.equal(true)
    })
  })
})
