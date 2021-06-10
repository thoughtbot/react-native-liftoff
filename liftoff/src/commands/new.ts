import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'new',
  run: async (toolbox: GluegunToolbox) => {
    const { filesystem, parameters, print, meta } = toolbox
    const { remove, path, copyAsync } = filesystem

    const appName = parameters.first

    if (appName === undefined) {
      print.error('You must provide a name.')
      return
    }

    print.info('Starting')

    await filesystem.dirAsync(appName)

    const liftoffPath = path(`${meta.src}`, '..')
    const boilerplatePath = path(liftoffPath, '../BoilerplateApp')

    remove(path(boilerplatePath, 'ios', 'Pods'))
    remove(path(boilerplatePath, 'node_modules'))

    const filesAndFolders = filesystem.cwd(boilerplatePath).find({
      matching: '*',
      directories: true,
      recursive: false,
      files: true
    })

    const copyPromises = filesAndFolders.map(fileOrFolder => {
      copyAsync(
        path(boilerplatePath, fileOrFolder),
        path(appName, fileOrFolder)
      )
    })

    Promise.all(copyPromises)

    process.chdir(appName)

    print.info('Installing yarn dependencies')
    await spawnProgress(`yarn install`)

    print.info(`Creating ${appName}`)
    await spawnProgress(`npx react-native-rename ${appName}`)

    print.info('Installing pods')
    await spawnProgress(`npx pod-install`)

    print.info('Done!')
  }
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
    const spawned = require('cross-spawn')(args.shift(), args, options)
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
