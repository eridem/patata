'use strict'
const Emulation = require('./emulation/webDriver')
const Capabilities = require('./capabilities')
const LoaderHelpers = require('./loaderHelper')
const Log = require('./log')
require('./dependencies')
class Patata {
  constructor () {
    this._hasStarted = false
    this._suites = []
    this._servers = []
    this._provider = null
    this._loggers = []
    this._emulator = null
  }
  get suites () { return this._suites }
  get currentSuite () { return this._currentSuite }
  get loaderHelper () {
    if (!this._loaderHelper) {
      this._loaderHelper = new LoaderHelpers.LoaderHelper()
    }
    return this._loaderHelper
  }
  get capabilityFactory () {
    if (!this._capabilityFactory) {
      this._capabilityFactory = new Capabilities.CapabilityFactory()
    }
    return this._capabilityFactory
  }
  get capability () { return this._capability }
  get servers () { return this._servers }
  get provider () { return this._provider }
  get loggers () { return this._loggers }
  get emulator () { return this._emulator }
  get config () { return this._config || {} }
  get log () {
    if (!this._log) {
      this._log = new Log.Log()
    }
    return this._log
  }
  init (suiteConfigurationArg) {
    this._currentSuite = this.getSuite(suiteConfigurationArg)
    this._capability = this.obtainCapability(this.currentSuite)
    this._provider = this.obtainProvider(this.currentSuite)
    this._servers = this.obtainServers(this.currentSuite)
    this._emulator = new Emulation.WebDriver(this)
    this._config = this.obtainConfig(this.currentSuite)
    return this
  }
  getSuite (suiteConfigurationArg) {
    var suiteConfiguration
    if (typeof suiteConfigurationArg === 'string') {
      suiteConfiguration = this._suites[suiteConfigurationArg]
    } else {
      suiteConfiguration = suiteConfigurationArg
    }
    return suiteConfiguration
  }
  start (hook, scenario, implicitWait) {
    return new Promise((resolve, reject) => {
      this.attachPatataIntoCucumber(hook)
      if (this._hasStarted) {
        resolve(this)
        return
      }
      if (this._provider === null) {
        throw this._log.getError('You need to attach a provider in order to obtain the file to test.')
      }
      this._provider.getBin().then((uri) => {
        this.emulator.start(uri).then(() => {
          console.log(this.log.getMessage('Using binary: ' + uri))
          resolve(this)
        }).catch((error) => {
          reject(error)
        })
      }).catch((error) => {
        reject(error)
      })
      this._hasStarted = true
    })
  }
  quit () {
    this.emulator.quit()
    return this
  }
  component (name, fn) {
    if (!name || !fn) {
      return this
    }
    if (fn.length === 0) {
      Object.defineProperty(Object.prototype, name, { get: fn }) // eslint-disable-line no-extend-native
    } else {
      this.component(name, () => fn)
    }
    return this
  }
  components (components) {
    for (var attr in components) {
      this.component(attr, components[attr])
    }
    return this
  }
  suite (name, suite) {
    this._suites[name] = this.loaderHelper.loadAsFunctionModuleOrObject(suite)
    return this
  }
  registerLogger (logger, options) {
    var Plugin = this.loaderHelper.obtainPlugin(logger)
    this._loggers.push(new Plugin(options))
    return this
  }
  registerProvider (provider, options) {
    if (!provider || provider === 'default') {
      provider = './defaults/defaultProvider.js'
    }
    var Plugin = this.loaderHelper.obtainPlugin(provider)
    return new Plugin(this, options)
  }
  obtainCapability (suiteConfiguration) {
    var result = this.capabilityFactory.getByName(suiteConfiguration.capability)
    return result
  }
  obtainProvider (suiteConfiguration) {
    suiteConfiguration.provider.package = suiteConfiguration.provider.package || 'default'
    return this.registerProvider(suiteConfiguration.provider.package, suiteConfiguration.provider)
  }
  obtainServers (suiteConfiguration) {
    return suiteConfiguration.servers
  }
  obtainConfig (suiteConfiguration) {
    var config = suiteConfiguration.config
    return this.loaderHelper.loadAsFunctionModuleOrObject(config)
  }
  attachPatataIntoCucumber (hook) {
    if (hook) {
      Object.defineProperty(hook, 'emu', {
        enumerable: true,
        writable: true,
        value: this.emulator.driver
      })
      Object.defineProperty(hook, 'config', {
        enumerable: true,
        writable: true,
        value: this.config
      })
    }
    Object.defineProperty(Object.prototype, 'config', this.config) // eslint-disable-line no-extend-native
    return this
  }
}
exports.Patata = Patata
