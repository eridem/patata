'use strict'

module.exports = function (dep) {
  const logMessage = (message, description, prefixColor, messageColor, descriptionColor) => {
    if (!message) return null

    message = messageColor(' ' + message)
    description = description ? descriptionColor(' ' + description) : ''

    return prefixColor('[Patata]') + message + description
  }

  const _log = (message, description, prefixColor, messageColor, descriptionColor) => {
    const { console } = dep

    let messageToPrint = logMessage(message, description, prefixColor, messageColor, descriptionColor)
    if (messageToPrint) {
      console.log(messageToPrint)
    } else {
      return null
    }
  }

  const log = (message, description) => {
    const { blue, gray, green } = dep.colors
    _log(message, description, blue, gray, green)
  }

  const debug = (message, description) => {
    const { yargs } = dep
    const { gray } = dep.colors

    if (!yargs.argv.verbose) return

    _log(message, description, gray, gray, gray)
  }

  const warn = (messages) => {
    const { console } = dep
    const { blue, yellow } = dep.colors

    if (!messages) return null

    messages = typeof messages === 'string' ? [messages] : messages instanceof Array ? messages : []
    messages.forEach(function (message) {
      console.error(blue('[Patata]'), yellow(message))
    }, this)
  }
  const exit = (messages) => {
    const { console, process } = dep
    const { red } = dep.colors

    if (!messages) return null

    messages = typeof messages === 'string' ? [messages] : messages instanceof Array ? messages : messages instanceof Error ? [messages.message] : []
    messages.forEach(function (message) {
      console.error(red('[Patata]'), red(message))
    }, this)
    process.exit(1)
  }

  return { logMessage, log, debug, warn, exit }
}
