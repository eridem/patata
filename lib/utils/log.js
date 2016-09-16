'use strict'

module.exports = (opts) => {
  const { console, process } = opts
  const { gray, green, blue, yellow, red } = opts.colors

  const logMessage = (message, description) => {
    if (!message) return null

    message = gray(' ' + message)
    description = description ? green(' ' + description) : ''

    return blue('[Patata]') + message + description
  }

  const log = (message, description) => {
    let messageToPrint = logMessage(message, description)
    if (messageToPrint) {
      console.log(messageToPrint)
    } else {
      return null
    }
  }

  const warn = (messages) => {
    if (!messages) return null

    messages = typeof messages === 'string' ? [messages] : messages instanceof Array ? messages : []
    messages.forEach(function (message) {
      console.error(blue('[Patata]'), yellow(message))
    }, this)
  }
  const exit = (messages) => {
    if (!messages) return null

    messages = typeof messages === 'string' ? [messages] : messages instanceof Array ? messages : []
    messages.forEach(function (message) {
      console.error(red('[Patata]'), red(message))
    }, this)
    process.exit(1)
  }

  return { logMessage, log, warn, exit }
}
