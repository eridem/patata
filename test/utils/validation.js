/* global describe, it */

require('chai').should()
const target = require('../../lib/utils/validation')

describe('validation.js', function () {
  describe('using .formatKey()', function () {
    it('should format empty texts', function () {
      target.formatKey(null).should.equal('')
      target.formatKey(undefined).should.equal('')
      target.formatKey('').should.equal('')
      target.formatKey('  ').should.equal('')
    })
    it('should format texts with spaces only', function () {
      target.formatKey('pataTa').should.equal('pataTa')
      target.formatKey(' patata ').should.equal('patata')
    })
  })

  describe('using .formatName()', function () {
    it('should format empty texts', function () {
      target.formatName(null).should.equal('')
      target.formatName(undefined).should.equal('')
      target.formatName('').should.equal('')
      target.formatName('  ').should.equal('')
    })
    it('should format texts with only symbols', function () {
      target.formatName(' ! _ ! ').should.equal('')
      target.formatName('&&').should.equal('')
      target.formatName('\\').should.equal('')
    })
    it('should format texts with spaces only', function () {
      target.formatName('pataTa').should.equal('patata')
      target.formatName('paTAta rama').should.equal('patata-rama')
      target.formatName(' patata ').should.equal('patata')
      target.formatName('   pataTA raMa ').should.equal('patata-rama')
      target.formatName(' paTAta_-_ ').should.equal('patata')
      target.formatName('   patAta-rama ').should.equal('patata-rama')
      target.formatName('   pAtAta-_rama ').should.equal('patata-rama')
    })
  })
  describe('using .formatParameter()', function () {
    it('should format empty texts', function () {
      target.formatParameter(null).should.equal('')
      target.formatParameter(undefined).should.equal('')
      target.formatParameter('').should.equal('')
      target.formatParameter('  ').should.equal('')
    })
    it('should format texts with only symbols', function () {
      target.formatParameter(' ! _ ! ').should.equal('')
      target.formatParameter('&&').should.equal('')
      target.formatParameter('\\').should.equal('')
    })
    it('should format texts with spaces only', function () {
      target.formatParameter('pataTa').should.equal('PATATA')
      target.formatParameter('paTAta rama').should.equal('PATATA_RAMA')
      target.formatParameter(' patata ').should.equal('PATATA')
      target.formatParameter('   pataTA raMa ').should.equal('PATATA_RAMA')
      target.formatParameter(' paTAta_-_ ').should.equal('PATATA')
      target.formatParameter('   patAta-rama ').should.equal('PATATA_RAMA')
      target.formatParameter('   pAtAta-_rama ').should.equal('PATATA_RAMA')
    })
  })

  describe('using .hasKey()', function () {
    it('should return "false" if arguments have not name', function () {
      target.hasKey({ argv: { name: null } }).should.equal(false)
      target.hasKey({ argv: { name: undefined } }).should.equal(false)
    })

    it('should return "false" if arguments is empty text', function () {
      target.hasKey({ argv: { name: '' } }).should.equal(false)
      target.hasKey({ argv: { name: '   ' } }).should.equal(false)
    })

    it('should return "false" if name is not valid', function () {
      target.hasKey({ argv: { name: '!' } }).should.equal(false)
      target.hasKey({ argv: { name: ' ! ' } }).should.equal(false)
      target.hasKey({ argv: { name: '.' } }).should.equal(false)
      target.hasKey({ argv: { name: '..' } }).should.equal(false)
      target.hasKey({ argv: { name: ' .. ' } }).should.equal(false)
      target.hasKey({ argv: { name: ' ! hello ! ' } }).should.equal(false)
      target.hasKey({ argv: { name: ' _ hello _ ' } }).should.equal(false)
      target.hasKey({ argv: { name: 'hello.' } }).should.equal(false)
      target.hasKey({ argv: { name: '.hello' } }).should.equal(false)
      target.hasKey({ argv: { name: '.hello.' } }).should.equal(false)
      target.hasKey({ argv: { name: ' .hello. ' } }).should.equal(false)
    })

    it('should return "true" if arguments has valid name', function () {
      target.hasKey({ argv: { name: 'hello' } }).should.equal(true)
      target.hasKey({ argv: { name: 'hel.lo' } }).should.equal(true)
      target.hasKey({ argv: { name: 'hel.lo.wor.ld' } }).should.equal(true)
      target.hasKey({ argv: { name: ' hello ' } }).should.equal(true)
      target.hasKey({ argv: { name: ' hel.lo ' } }).should.equal(true)
    })
  })

  describe('using .hasName()', function () {
    it('should return "false" if arguments have not name', function () {
      target.hasName({ argv: { name: null } }).should.equal(false)
      target.hasName({ argv: { name: undefined } }).should.equal(false)
    })

    it('should return "false" if arguments is empty text', function () {
      target.hasName({ argv: { name: '' } }).should.equal(false)
      target.hasName({ argv: { name: '   ' } }).should.equal(false)
    })

    it('should return "false" if name is not valid', function () {
      target.hasName({ argv: { name: '!' } }).should.equal(false)
      target.hasName({ argv: { name: ' ! ' } }).should.equal(false)
      target.hasName({ argv: { name: ' - ' } }).should.equal(false)
      target.hasName({ argv: { name: ' _ ' } }).should.equal(false)
    })

    it('should return "true" if arguments has valid name', function () {
      target.hasName({ argv: { name: 'hello' } }).should.equal(true)
      target.hasName({ argv: { name: ' hello ' } }).should.equal(true)
      target.hasName({ argv: { name: ' ! hello ! ' } }).should.equal(true)
      target.hasName({ argv: { name: ' _ hello _ ' } }).should.equal(true)
    })
  })

  describe('using .hasNameParameter()', function () {
    it('should return "false" if arguments have not name', function () {
      target.hasNameParameter({ argv: { name: null } }).should.equal(false)
      target.hasNameParameter({ argv: { name: undefined } }).should.equal(false)
    })

    it('should return "false" if arguments is empty text', function () {
      target.hasNameParameter({ argv: { name: '' } }).should.equal(false)
      target.hasNameParameter({ argv: { name: '   ' } }).should.equal(false)
    })

    it('should return "false" if name is not valid', function () {
      target.hasNameParameter({ argv: { name: '!' } }).should.equal(false)
      target.hasNameParameter({ argv: { name: ' ! ' } }).should.equal(false)
      target.hasNameParameter({ argv: { name: ' - ' } }).should.equal(false)
      target.hasNameParameter({ argv: { name: ' _ ' } }).should.equal(false)
    })

    it('should return "true" if arguments has valid name', function () {
      target.hasNameParameter({ argv: { name: 'hello' } }).should.equal(true)
      target.hasNameParameter({ argv: { name: ' hello ' } }).should.equal(true)
      target.hasNameParameter({ argv: { name: ' ! hello ! ' } }).should.equal(true)
      target.hasNameParameter({ argv: { name: ' _ hello _ ' } }).should.equal(true)
    })
  })
})
