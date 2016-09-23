'use strict'

module.exports = function (dep) {
  const logMessage = (message, description) => {
    const { gray, green, blue } = dep.colors

    if (!message) return null

    message = gray(' ' + message)
    description = description ? green(' ' + description) : ''

    return blue('[Patata]') + message + description
  }

  const log = (message, description) => {
    const { console } = dep

    let messageToPrint = logMessage(message, description)
    if (messageToPrint) {
      console.log(messageToPrint)
    } else {
      return null
    }
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

  return { logMessage, log, warn, exit }
}
