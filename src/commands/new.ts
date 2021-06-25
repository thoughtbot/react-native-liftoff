import { print, GluegunToolbox } from 'gluegun'

const line1 = `   __  __                      __    __  __          __ `
const line2 = `  / /_/ /_  ____  __  ______ _/ /_  / /_/ /_  ____  / /_`
const line3 = ` / __/ __ \\/ __ \\/ / / / __ \`/ __ \\/ __/ __ \\/ __ \\/ __/`
const line4 = `/ /_/ / / / /_/ / /_/ / /_/ / / / / /_/ /_/ / /_/ / /_  `
const line5 = `\\__/_/ /_/\\____/\\__,_/\\__, /_/ /_/\\__/_.___/\\____/\\__/  `
const line6 = `                     /____/                             `

const thoughtbotAscii = [line1, line2, line3, line4, line5, line6]

const spaceBefore = ' '

module.exports = {
  name: 'new',
  run: async (toolbox: GluegunToolbox) => {
    const { filesystem, parameters, print } = toolbox

    const appName = parameters.first

    // Ensure we have an app name
    if (appName === undefined) {
      print.error('You must provide a name')
      return
    }

    print.divider()

    startSection()
    startSpinner('Lifting off')

    // Create directory with name of app
    await filesystem.dirAsync(appName)

    // Copy boilerplate files into app directory
    copyBoilerplate(toolbox, appName)

    // Change directory to app directory
    process.chdir(appName)

    stopSpinner('Lifting off', '🚀')

    startSpinner('Installing Yarn dependencies')
    await spawnProgress(`yarn install`)
    stopSpinner('Installing Yarn dependencies', '🧶')

    startSpinner(`Creating ${appName}`)
    await spawnProgress(`npx react-native-rename ${appName}`)
    stopSpinner(`Creating ${appName}`, '🦄')

    startSpinner('Installing Pods')
    await spawnProgress(`npx pod-install --repo-update`)
    stopSpinner('Installing Pods', '🍫')

    print.info(spaceBefore + ' 🎉 Done!')
    endSection()

    startSection()
    print.success(spaceBefore + 'To get started:')
    print.info(spaceBefore + `  cd ${appName}`)
    print.info(spaceBefore + '  yarn ios')
    print.info(spaceBefore + '  yarn android')
    endSection()

    startSection()
    print.info(spaceBefore + 'Made with <3 by:')
    thoughtbotAscii.forEach(line => {
      print.info(' ' + line)
    })
    endSection()

    print.error(spaceBefore + 'https://thoughtbot.com')

    endSection()

    print.divider()
  }
}

const startSection = () => {
  print.newline()
}
const endSection = () => {
  print.newline()
}

const copyBoilerplate = (toolbox: GluegunToolbox, appName: string): void => {
  const { meta, filesystem } = toolbox
  const { remove, path, copyAsync } = filesystem

  const liftoffPath = path(meta.src || '', '.')
  const boilerplatePath = path(liftoffPath, '../BoilerplateApp')

  remove(path(boilerplatePath, 'ios', 'Pods'))
  remove(path(boilerplatePath, 'node_modules'))

  const copyTargets = filesystem.cwd(boilerplatePath).find({
    matching: '*',
    directories: true,
    recursive: false,
    files: true
  })

  const copyPromises = copyTargets.map(copyTarget => {
    copyAsync(
      path(boilerplatePath, copyTarget),
      path(appName, copyTarget)
    ).catch(error => print.error(error))
  })

  Promise.all(copyPromises).catch(error => print.error(error))
}

export type SpawnOptions = {
  onProgress?: (data: string) => void
  env?: Record<string, unknown>
}

const spawnProgress = (
  commandLine: string,
  options?: SpawnOptions
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const args = commandLine.split(' ')
    const spawned = require('cross-spawn')(args[0], args.slice(1), options)
    const output = []

    spawned.stdout.on('data', data => {
      data = data.toString()
      return options?.onProgress ? options.onProgress(data) : output.push(data)
    })
    spawned.stderr.on('data', data => output.push(data))
    spawned.on('close', code =>
      code === 0 ? resolve(output.join('')) : reject(output.join(''))
    )
    spawned.on('error', err => reject(err))
  })
}

type Spinner = ReturnType<typeof print.spin>

const spinners: { [key: string]: Spinner } = {}

export const startSpinner = (m = '') => {
  let spinner = spinners[m]
  if (!spinner) {
    spinner = print.spin({
      prefixText: spaceBefore,
      text: print.colors.gray(m)
    })
    spinners[m] = spinner
  }
  return spinner
}

export const stopSpinner = (m: string, symbol: string) => {
  const spinner = spinners[m]
  if (spinner) {
    spinner.stopAndPersist({ symbol })
    delete spinners[m]
  }
}

export const clearSpinners = () => {
  Object.keys(spinners).forEach(m => {
    spinners[m].stop()
    delete spinners[m]
  })
}
