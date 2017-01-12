'use strict'

module.exports = function () {
  // World
  const previousWorld = this.World
  this.World = function World () {
    this.platform = 'ios'

    if (previousWorld) {
      let worldInstance = previousWorld.apply(this, Object.keys(arguments).map(k => arguments[k]))
      if (worldInstance) {
        Object.assign(this, worldInstance)
      }
    }
  }
}
