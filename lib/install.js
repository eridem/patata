'use strict'

module.exports = function (opts, log, exampleFolder) {
  log.log('Installing...')

  return new Promise((resolve, reject) => {
    require('shelljs/global')
    if (!process.env.JAVA_HOME) {
        return reject('You must install Java JDK: http://www.oracle.com/technetwork/java/javase/downloads/index.html')
    }

    if (exec('npm install').code !== 0) {
      return reject('There was a problem installing.')
    } else {
      return resolve()
    }
  })
}
