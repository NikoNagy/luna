/**
 * NPM cli commands
 **/

const cp = require('child_process')
const Q = require('q')
const path = require('path')
const github = require('./github')
const { merge } = require('ramda')

const spawn = cp.spawn

/** Run npm command **/
function runCommand(command, directory, callback, opts) {
  console.log(`running: npm ${command.join(' ')}`)

  const deferred = Q.defer()
  const cwd = process.cwd()
  const { repo, pkgName, latest } = opts || {}
  let result = '',
    error = ''

  // on windows use npm.cmd
  const npmc = spawn(
    /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
    command,
    {
      env: process.env,
      cwd: directory ? path.dirname(directory) : cwd
    }
  )

  npmc.stdout.on('data', (data) => {
    const dataToString = data.toString()
    result += dataToString
    callback('flow', dataToString)
  })

  npmc.stderr.on('data', (error) => {
    const errorToString = error.toString()
    error += `${errorToString} | `
    callback('error', errorToString)
  })

  npmc.on('close', () => {
    console.log(`finished: npm ${command.join(' ')}`)

    const results = {
      status: 'close',
      error: error.length ? error : null,
      data: result,
      cmd: command,
      latest: latest
    }

    deferred.resolve(results)
    // if (repo && repo.url) {
    //   const getStats = github.fetchStats({
    //     repoUrl: repo.url || null,
    //     pkgName
    //   })
    //
    //   getStats
    //     .then((stats) => {
    //       deferred.resolve(
    //         merge(results, {
    //           stats: stats
    //         })
    //       )
    //     })
    //     .catch((e) => {
    //       console.log('Error fetching stats from github')
    //       deferred.resolve(results)
    //     })
    // } else {
    //   deferred.resolve(results)
    // }
  })

  return deferred.promise
}

// npm list [[<@scope>/]<pkg> ...]
exports.list = function(opts, callback) {
  const command = ['list']
  const { mode, directory, options } = opts
  const defaults = ['--depth=0', '--long', '--json']

  if (!command || !Array.isArray(command)) {
    return Q.reject(
      new Error('shell[doCommand]:cmd must be given and must be an array')
    )
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults
  const run = [].concat(command).concat(commandArgs.reverse())
  return runCommand(run, directory, callback)
}

// npm list [[<@scope>/]<pkg> ...]
exports.outdated = function(opts, callback) {
  const command = ['outdated']
  const deferred = Q.defer()
  const cwd = process.cwd()
  const { mode, directory, options } = opts
  const defaults = ['--depth=0', '--json']

  if (!command || !Array.isArray(command)) {
    return Q.reject(
      new Error('shell[doCommand]:cmd must be given and must be an array')
    )
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults
  const run = [].concat(command).concat(commandArgs)
  return runCommand(run, directory, callback)
}

// npm view [<@scope>/]<name>[@<version>]
exports.view = function(opts, callback) {
  const command = ['view']
  const deferred = Q.defer()
  const cwd = process.cwd()
  const { mode, directory, pkgName, pkgVersion, repo, latest } = opts
  const defaults = ['--depth=0', '--json']

  if (!pkgName) {
    return Q.reject(new Error(`npmApi[${command}]:package name must be given`))
  }

  let result = '',
    error = ''

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults

  //build npm command
  const run = []
    .concat(command)
    .concat(pkgVersion ? [].concat([`${pkgName}@${pkgVersion}`]) : [pkgName])
    .concat(commandArgs)

  return runCommand(run, directory, callback, {
    repo,
    pkgName,
    latest
  })
}

// npm search [-l|--long] [--json]
exports.search = function(opts, callback) {
  const command = ['search']
  const deferred = Q.defer()
  const { pkgName } = opts
  const defaults = ['--depth=0', '--json']

  let result = '',
    error = ''

  if (!pkgName) {
    return Q.reject(
      new Error(`npmApi[${command[0]}]:package name must be given`)
    )
  }

  const run = [].concat(command, pkgName).concat(defaults)
  return runCommand(run, null, callback)
}

// npm install [<@scope>/]<name>@<version>
exports.install = function(opts, callback) {
  const command = ['install']
  const { pkgName, mode, directory, pkgVersion, multiple, packages } = opts
  const defaults = [],
    pkgOptions = opts.pkgOptions || []

  if (!pkgName && !multiple) {
    throw new Error('npmApi:install package name cannot be empty or undefined')
  }

  function getNames() {
    return multiple && packages && Array.isArray(packages)
      ? packages
      : pkgVersion ? `${pkgName}@${pkgVersion}` : pkgName
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults
  const commandOpts =
    pkgOptions && pkgOptions.length
      ? pkgOptions.map((option) => `--${option}`)
      : []

  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(getNames())
    .concat(commandOpts)

  return runCommand(run, directory, callback)
}

// npm uninstall [<@scope>/]<pkg>[@<version>]
exports.uninstall = function(opts, callback) {
  const command = ['uninstall']
  const { pkgName, mode, directory, multiple, packages } = opts
  const defaults = []

  function getNames() {
    if (multiple && packages && Array.isArray(packages)) {
      return packages
    } else if (!pkgName && !multiple) {
      throw new Error(
        'npmApi:uninstall package name cannot be empty or undefined'
      )
    } else {
      return pkgName
    }
  }

  const commandArgs = mode === 'GLOBAL' ? [].concat(defaults, '-g') : defaults
  const run = []
    .concat(command)
    .concat(commandArgs)
    .concat(getNames())
  return runCommand(run, directory, callback)
}
