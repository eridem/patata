/* global describe, it */

const { join } = require('path')
const chai = require('chai')
chai.should()

const file = 'setting.js'
const target = require(join(__dirname, '../../lib/modules/', file))

describe(file, function () {
  const fakeCwd = '/my/path/'
  const fakeJoin = function () {
    return Object.keys(arguments).map(k => arguments[k]).toString()
  }
  const fakeProcess = { cwd: () => fakeCwd }

  describe('using .storagePath()', function () {
    it('should return the patata config path', function () {
      let targetModule = target({ join: fakeJoin, process: fakeProcess })
      targetModule.storagePath().should.equal([fakeCwd, 'patata.yml'].toString())
    })
  })
})
