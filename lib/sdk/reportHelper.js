'use strict'
class ReportHelper {
  toFeature (event) {
    let result = {
      description: event.getDescription(),
      keyword: event.getKeyword(),
      line: event.getLine(),
      name: event.getName(),
      scenarioKeyword: event.getScenarioKeyword(),
      stepKeywordByLines: event.getStepKeywordByLines(),
      tags: event.getTags(),
      uri: event.getUri()
    }
    return result
  }
  toScenario (event) {
    let result = {
      description: event.getDescription(),
      keyword: event.getKeyword(),
      line: event.getLine(),
      lines: event.getLine(),
      name: event.getName(),
      tags: event.getTags(),
      uri: event.getUri()
    }
    return result
  }
  toStep (event) {
    let result = {
      arguments: event.getArguments(),
      keyword: event.getKeyword(),
      line: event.getLine(),
      lines: event.getLines(),
      name: event.getName(),
      uri: event.getUri(),
      uris: event.getUri(),
      isEventStep: event.isEventStep(),
      isHidden: event.isHidden(),
      isOutcomeStep: event.isOutcomeStep(),
      isPrecededByEventStep: event.isPrecededByEventStep(),
      isPrecededByOutcomeStep: event.isPrecededByOutcomeStep(),
      isRepeatingEventStep: event.isRepeatingEventStep(),
      isRepeatingOutcomeStep: event.isRepeatingOutcomeStep()
    }
    return result
  }
  toStepResult (event) {
    var result = {
      duration: event.getDuration(),
      failureException: event.getFailureException(),
      pendingReason: event.getPendingReason(),
      status: event.status
    }
    return result
  }
  toScenarioResult (event) {
    var result = {
      duration: event.getDuration(),
      failureException: event.getFailureException(),
      stepCounts: event.getStepCounts(),
      status: event.status
    }
    return result
  }
  toFeaturesResult (event) {
    var result = {
      duration: event.getDuration(),
      isSuccessful: event.isSuccessful(),
      stepCounts: event.getStepCounts(),
      scenarioCounts: event.getScenarioCounts()
    }
    return result
  }
}
exports.ReportHelper = ReportHelper
