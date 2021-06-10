import { print, GluegunToolbox } from 'gluegun'

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

    startSpinner('Starting')

    print.newline()

    // Create directory with name of app
    await filesystem.dirAsync(appName)

    // Copy boilerplate files into app directory
    copyBoilerplate(toolbox, appName)

    // Change directory to app directory
    process.chdir(appName)

    stopSpinner('Starting', '√')

    startSpinner('Installing yarn dependencies')
    await spawnProgress(`yarn install`)
    stopSpinner('Installing yarn dependencies', '√')

    print.newline()

    print.info(`Creating ${appName}`)
    await spawnProgress(`npx react-native-rename ${appName}`)

    print.newline()

    print.info('Installing pods')
    await spawnProgress(`npx pod-install`)

    print.newline()

    print.info('Done!')
  }
}

const copyBoilerplate = (toolbox: GluegunToolbox, appName: string): void => {
  const { meta, filesystem } = toolbox
  const { remove, path, copyAsync } = filesystem

  const liftoffPath = path(meta.src || '', '..')
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
    copyAsync(path(boilerplatePath, copyTarget), path(appName, copyTarget))
  })

  Promise.all(copyPromises)
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
    spinner = print.spin({ prefixText: '   ', text: print.colors.gray(m) })
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
