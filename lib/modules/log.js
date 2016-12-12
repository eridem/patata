'use strict'

module.exports = function (dep) {
  const logMessage = (message, description, prefixColor, messageColor, descriptionColor) => {
    if (!message) return null

    message = messageColor(' ' + message)
    description = description ? descriptionColor(' ' + description) : ''

    return prefixColor('[Patata]') + message + description
  }

  const _log = (message, description, prefixColor, messageColor, descriptionColor, logFn) => {
    let messageToPrint = logMessage(message, description, prefixColor, messageColor, descriptionColor)
    if (messageToPrint) {
      logFn(messageToPrint)
    } else {
      return null
    }
  }

  const formatError = (message) => {
    message = [`${message.message}

    The following stack trace was generated as a result of the error "${message.message}":
    ${message.stack}

    `]
    return message
  }

  const log = (message, description) => {
    const { console } = dep
    const { blue, gray, green } = dep.colors
    if (message instanceof Error) message = formatError(message)

    return _log(message, description, blue, gray, green, console.log)
  }

  const debug = (message, description) => {
    const { yargs, console } = dep
    const { gray } = dep.colors

    if (!yargs.argv.verbose) return null

    if (message instanceof Error) message = formatError(message)
    return _log(message, description, gray, gray, gray, console.info)
  }

  const warn = (message, description) => {
    const { console } = dep
    const { blue, yellow, red } = dep.colors
    if (message instanceof Error) message = formatError(message)

    return _log(message, description, blue, yellow, red, console.warn)
  }

  const error = (message, description) => {
    const { console } = dep
    const { yellow, red } = dep.colors
    if (message instanceof Error) message = formatError(message)

    return _log(message, description, red, yellow, red, console.error)
  }

  const exit = (messages) => {
    const { console, process } = dep
    const { red } = dep.colors

    if (!messages) return null

    if (typeof messages === 'string') {
      messages = [messages]
    } else if (messages instanceof Error) {
      messages = formatError(messages)
    } else if (!(messages instanceof Array)) {
      messages = []
    }

    messages.forEach(function (message) {
      console.error(red('[Patata]'), red(message))
    }, this)
    process.exit(1)
  }

  return { logMessage, log, debug, warn, error, exit }
}
