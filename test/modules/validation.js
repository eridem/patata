/* global before, describe, it */

const { join } = require('path')
require('chai').should()
const target = require(join(__dirname, '../../lib/modules/validation'))

describe('validation.js', function () {
  let targetModule

  before(function () {
    targetModule = target({ process })
  })

  describe('using .formatName()', function () {
    it('should format empty texts', function () {
      targetModule.formatName(null).should.equal('')
      targetModule.formatName(undefined).should.equal('')
      targetModule.formatName('').should.equal('')
      targetModule.formatName('  ').should.equal('')
    })
    it('should format texts with only symbols', function () {
      targetModule.formatName(' ! _ ! ').should.equal('')
      targetModule.formatName('&&').should.equal('')
      targetModule.formatName('\\').should.equal('')
    })
    it('should format texts with spaces only', function () {
      targetModule.formatName('pataTa').should.equal('patata')
      targetModule.formatName('paTAta rama').should.equal('patata-rama')
      targetModule.formatName(' patata ').should.equal('patata')
      targetModule.formatName('   pataTA raMa ').should.equal('patata-rama')
      targetModule.formatName(' paTAta_-_ ').should.equal('patata')
      targetModule.formatName('   patAta-rama ').should.equal('patata-rama')
      targetModule.formatName('   pAtAta-_rama ').should.equal('patata-rama')
    })
  })
})
