'use strict'

module.exports = (opts) => {
  const { console, process } = opts
  const { gray, green, blue, yellow, red } = opts.colors

  const log = (message, description) => {
    if (!message) return null

    if (description) {
      message = gray(message)
      description = green(description)
    } else {
      message = gray(message)
    }
    console.log(blue('[Patata]'), message, description || '')
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

  return { log, warn, exit }
}
