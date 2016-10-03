'use strict'
const extend = require('util')._extend
class Ios81 {
  constructor () {
    this.platformName = 'iOS'
    this.platformVersion = '8.1'
    this.deviceName = 'iPhone Simulator'
    this.app = ''
  }
}
class Ios92 {
  constructor () {
    this.platformName = 'iOS'
    this.platformVersion = '9.2'
    this.deviceName = 'iPhone Simulator'
    this.app = ''
  }
}
class Android {
  constructor () {
    this.platformName = 'Android'
    this.platformVersion = ''
    this.deviceName = 'Android Emulator'
    this.app = ''
  }
}
class Android18 {
  constructor () {
    this.platformName = 'Android'
    this.platformVersion = '4.3'
    this.deviceName = 'Android Emulator'
    this.app = ''
  }
}
class Android19 {
  constructor () {
    this.platformName = 'Android'
    this.platformVersion = '4.4.2'
    this.deviceName = 'Android Emulator'
    this.app = ''
  }
}
class Android20 {
  constructor () {
    this.platformName = 'Android'
    this.platformVersion = '4.4W.2'
    this.deviceName = 'Android Emulator'
    this.app = ''
  }
}
class Android21 {
  constructor () {
    this.platformName = 'Android'
    this.platformVersion = '5.0.1'
    this.deviceName = 'Android Emulator'
    this.app = ''
  }
}
class Android22 {
  constructor () {
    this.platformName = 'Android'
    this.platformVersion = '5.1.1'
    this.deviceName = 'Android Emulator'
    this.app = ''
  }
}
class Android23 {
  constructor () {
    this.platformName = 'Android'
    this.platformVersion = '6.0'
    this.deviceName = 'Android Emulator'
    this.app = ''
  }
}
class CapabilityFactory {
  constructor () {
    this._capabilities = {
      ios81: new Ios81(),
      ios92: new Ios92(),
      android: new Android(),
      android18: new Android18(),
      android19: new Android19(),
      android20: new Android20(),
      android21: new Android21(),
      android22: new Android22(),
      android23: new Android23()
    }
    this.setCapabilitiesFriendlyNames()
  }
  get capabilities () {
    return this._capabilities
  }
  getByName (name) {
    if (typeof name === 'string') {
      return this.capabilities[name]
    } else if (name) {
      if (name.template && name.append) {
        var template = this.capabilities[name.template]
        var append = name.append
        return extend(template, append)
      }
      return name
    } else {
      throw new Error('Capability not found.')
    }
  }
    /**
     * This set capabilities names like: ios-8.1, android-5.1.1, ...
     */
  setCapabilitiesFriendlyNames () {
    var capabilitiesWithFriendlyNames = {}
    for (var capName in this.capabilities) {
      var capability = this.capabilities[capName]
      if (capability.platformVersion) {
        var friendlyName = `${capability.platformName}-${capability.platformVersion}`.toLocaleLowerCase()
        capabilitiesWithFriendlyNames[friendlyName] = capability
      }
      capabilitiesWithFriendlyNames[capName] = capability
    }
    this._capabilities = capabilitiesWithFriendlyNames
  }
}
exports.CapabilityFactory = CapabilityFactory
