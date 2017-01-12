'use strict'

const patata = require('../../sdk/index')
module.exports = function () {
  // World
  const previousWorld = this.World
  this.World = function World () {
    this.device = patata.emulator.driver
    this.config = patata.config

    if (previousWorld) {
      let worldInstance = previousWorld.apply(this, Object.keys(arguments).map(k => arguments[k]))
      if (worldInstance) {
        Object.assign(this, worldInstance)
      }
    }
  }
}
