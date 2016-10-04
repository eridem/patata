#!/usr/bin/env node
'use strict'

// Always colors for better debug
process.argv.push('--color=always')

// External dependencies
const { join, resolve } = require('path')
const __rootdirname = __dirname
const requireDir = require('require-dir')
const colors = require('chalk')
const shell = require('shelljs')
const extend = require('util')._extend
const asciify = require('asciify')
const http = require('http')
const url = require('url')
const fs = require('fs')
const net = require('net')
const yargs = require('yargs')
const glob = require('glob')
const querystring = require('querystring')
const HockeyApp = require('hockeyapp-api-wrapper')
const yaml = require('js-yaml')
const cucumberHtmlReporter = require('cucumber-html-reporter')
const gherkinLint = { run: function () { require('gherkin-lint') } }

// Show CLI info
if (yargs.argv._.length) {
  const packageJson = require(join(__dirname, '/package.json'))
  console.log(colors.blue(`[Patata]`), colors.yellow(`Version ${packageJson.version}. More info: ${packageJson.homepage}`))
}

// Switch CWD if specified from options
const cwd = resolve(yargs.argv.cwd || process.cwd())
process.chdir(cwd)

// External dependencies to pass to the commands
let dep = { yargs, join, resolve, console, colors, shell, process, __rootdirname, extend, url, asciify, http, net, fs, glob, querystring, HockeyApp, yaml, cucumberHtmlReporter, gherkinLint }

// Internal dependencies
const inDepFns = requireDir(join(__rootdirname, 'lib', 'modules'), { camelcase: true })
Object.keys(inDepFns).forEach(name => { dep[name] = inDepFns[name](dep) })

// Load commands from folder and pass dependencies
const commandsFn = requireDir(join(__rootdirname, 'lib', 'commands'))
const commands = Object.keys(commandsFn).map((i) => commandsFn[i](dep))

// Change width of terminal messages
let terminalWidth = require('yargs').terminalWidth()
terminalWidth = terminalWidth > 100 ? 100 : terminalWidth

// Init CLI commands and options
commands.forEach(cmd => yargs.command(cmd.command, cmd.desc, cmd.builder, (argv) => {
  try {
    cmd.handler(argv)
  } catch (ex) {
    dep.log.exit(ex)
  }
}))
yargs
  .wrap(terminalWidth)
  .options({ cwd: { desc: 'Change the current working directory', type: 'string' } })
  .options({ verbose: { desc: 'Show all debug messages', type: 'boolean' } })
  .demand(1)
  .version()
  .alias('version', 'v')
  .help()
  .alias('help', 'h')
  .argv
