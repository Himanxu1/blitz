import {normalize, ServerConfig} from "./config"
import {
  nextBuild,
  nextStart,
  nextStartDev,
  customServerExists,
  startCustomServer,
  buildCustomServer,
} from "./next-utils"

export async function build(config: ServerConfig) {
  const {rootFolder, nextBin, watch} = await normalize(config)

  await nextBuild(nextBin, rootFolder, {} as any, config)
  if (customServerExists()) await buildCustomServer({watch})
}

export async function dev(config: ServerConfig) {
  const {rootFolder, nextBin} = await normalize({...config, env: "dev"})

  if (customServerExists()) {
    console.log("Using your custom server")

    // todo
    // const {loadConfigProduction} = await import("next/dist/server/config-shared")
    // const blitzConfig = loadConfigProduction(config.rootFolder)
    // const watch = blitzConfig.customServer?.hotReload ?? true
    const watch = true

    await startCustomServer(rootFolder, config, {watch})
  } else {
    await nextStartDev(nextBin, rootFolder, {} as any, rootFolder, config)
  }
}

export async function prod(config: ServerConfig) {
  const {rootFolder, nextBin} = await normalize(config)

  if (customServerExists()) {
    console.log("Using your custom server")
    await startCustomServer(rootFolder, config)
  } else {
    await nextStart(nextBin, rootFolder, config)
  }
}