'use strict'

require('shelljs/global')
const fs = require('fs')
const path = require('path')
const patataConfigPath = path.join(process.cwd(), '/patata.json')

module.exports = {
  get: () => {
    if (!test('-e', patataConfigPath)) {
      throw new Error(`"patata.json" must exists in "${patataConfigPath}" and you must be on the root of the project to run this command.`)
    }

    let patataConfig = require(patataConfigPath)
    return patataConfig
  },
  set: (obj) => {
    if (!test('-e', patataConfigPath)) {
      throw new Error(`"patata.json" must exists in "${patataConfigPath}" and you must be on the root of the project to run this command.`)
    }

    fs.writeFileSync(patataConfigPath, JSON.stringify(obj, null, 2))
  }
}
