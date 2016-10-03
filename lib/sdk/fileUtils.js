'use strict'
class FileUtils {
  generateResultsFilePath (extension) {
    return this.generateFilePath('./results-', extension)
  }
  generateFilePath (prefix, extension) {
    return prefix + new Date().toISOString()
            .replace(/[-|:|Z|\.]/gi, '')
            .replace(/T/gi, '-') + '.' + extension
  }
}
exports.FileUtils = FileUtils
