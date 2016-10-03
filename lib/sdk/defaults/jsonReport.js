'use strict'
const fs = require('fs')
// / <reference path="../typings/es6-promise/es6-promise.d.ts" />
class JsonReport {
  constructor (opts) {
    this._result = { features: [] }
    this.validateOptions(opts)
    this._path = opts.path
  }
  get path () { return this._path }
  validateOptions (opts) {
    if (!opts.path) {
      throw new Error('[Patata][JsonReport] You need to specify the option "path" with the output file path')
    }
  }
  fromEmulator (action, meth, path, data) {
    return new Promise((resolve, reject) => {
      try {
        var placeToSave = this._currentStep || this._currentScenario || this._currentFeature
        placeToSave.emulatorSteps = placeToSave.emulatorSteps || []
        placeToSave.emulatorSteps.push({ action: action, meth: meth, path: path, data: data })
        resolve()
      } catch (ex) {
        reject(ex)
      }
    })
  }
  beforeFeature (event) {
    return new Promise((resolve, reject) => {
      try {
        this._result.features.push(event)
        this._currentFeature = event
        resolve()
      } catch (ex) {
        reject(ex)
      }
    })
  }
  afterFeature (event) {
    return new Promise((resolve, reject) => {
      try {
        this._currentFeature = null
        resolve()
      } catch (ex) {
        reject(ex)
      }
    })
  }
  featuresResult (event) {
    return new Promise((resolve, reject) => {
      try {
        this._result.result = event
        resolve()
      } catch (ex) {
        reject(ex)
      }
    })
  }
  beforeScenario (event) {
    return new Promise((resolve, reject) => {
      try {
        this._currentFeature.scenarios = this._currentFeature.scenarios || []
        this._currentFeature.scenarios.push(event)
        this._currentScenario = event
        resolve()
      } catch (ex) {
        reject(ex)
      }
    })
  }
  afterScenario (event) {
    return new Promise((resolve, reject) => {
      try {
        this._currentScenario = null
        resolve()
      } catch (ex) {
        reject(ex)
      }
    })
  }
  scenarioResult (event) {
    return new Promise((resolve, reject) => {
      try {
        this._currentScenario.result = event
        resolve()
      } catch (ex) {
        reject(ex)
      }
    })
  }
  beforeStep (event) {
    return new Promise((resolve, reject) => {
      try {
        this._currentScenario.steps = this._currentScenario.steps || []
        this._currentScenario.steps.push(event)
        this._currentStep = event
        resolve()
      } catch (ex) {
        reject(ex)
      }
    })
  }
  afterStep (event) {
    return new Promise((resolve, reject) => {
      try {
        this._currentStep = null
        resolve()
      } catch (ex) {
        reject(ex)
      }
    })
  }
  stepResult (event) {
    return new Promise((resolve, reject) => {
      try {
        this._currentStep.result = event
        let resultAsString = JSON.stringify(this._result)
        fs.writeFile(this.path, resultAsString, resolve)
      } catch (ex) {
        reject(ex)
      }
    })
  }
}
exports.JsonReport = JsonReport
