'use strict'
const path = require('path')
let reporter = function () {
  let reportHelper = require(path.join(__dirname, '../../index')).reportHelper
  let reports = require(path.join(__dirname, '../../index')).reports
  let chainReportPromises = function (reports, event, fnString, callback) {
    reports = reports || []
        // First dummy chain
    var promise = new Promise((resolve) => { resolve() })
        // Chain promises to execute one by one synchronously
    reports.forEach((report) => {
      if (typeof report[fnString] !== 'function') {
        return
      }
      promise = promise.then(() => {
        return report[fnString](event) || new Promise((resolve) => { resolve() })
      })
    })
    Promise.all([promise]).then(() => {
      callback()
    }).catch(reason => {
      console.log(`[Patata] Error on reports: ${JSON.stringify(reason)}`)
      callback()
    })
  }
  this.registerHandler('BeforeFeature', (event, callback) => {
    chainReportPromises(reports, reportHelper.toFeature(event), 'beforeFeature', callback)
  })
  this.registerHandler('AfterFeature', (event, callback) => {
    chainReportPromises(reports, reportHelper.toFeature(event), 'afterFeature', callback)
  })
  this.registerHandler('FeaturesResult', (event, callback) => {
    chainReportPromises(reports, reportHelper.toFeaturesResult(event), 'featuresResult', callback)
  })
  this.registerHandler('BeforeScenario', (event, callback) => {
    chainReportPromises(reports, reportHelper.toScenario(event), 'beforeScenario', callback)
  })
  this.registerHandler('AfterScenario', (event, callback) => {
    chainReportPromises(reports, reportHelper.toScenario(event), 'afterScenario', callback)
  })
  this.registerHandler('ScenarioResult', (event, callback) => {
    chainReportPromises(reports, reportHelper.toScenarioResult(event), 'scenarioResult', callback)
  })
  this.registerHandler('BeforeStep', (event, callback) => {
    chainReportPromises(reports, reportHelper.toStep(event), 'beforeStep', callback)
  })
  this.registerHandler('AfterStep', (event, callback) => {
    chainReportPromises(reports, reportHelper.toStep(event), 'afterStep', callback)
  })
  this.registerHandler('StepResult', (event, callback) => {
    chainReportPromises(reports, reportHelper.toStepResult(event), 'stepResult', callback)
  })
}
module.exports = reporter
