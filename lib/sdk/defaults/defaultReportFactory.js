'use strict'
class DefaultReportFactory {
  get (report) {
    if (report.package === 'json') {
      report.package = './defaults/jsonReport.js'
    }
    return report
  }
}
exports.DefaultReportFactory = DefaultReportFactory
