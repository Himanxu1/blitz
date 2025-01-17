import fs, {promises} from "fs"
import {join, resolve} from "path"
import {readJSON} from "fs-extra"
import path from "path"
import pkgDir from "pkg-dir"
import resolveCwd from "resolve-cwd"
const debug = require("debug")("blitz:utils")

export async function resolveBinAsync(pkg: string, executable = pkg) {
  const packageDir = await pkgDir(resolveCwd(pkg))
  if (!packageDir) throw new Error(`Could not find package.json for '${pkg}'`)

  const {bin} = await readJSON(path.join(packageDir, "package.json"))
  const binPath = typeof bin === "object" ? bin[executable] : bin

  if (!binPath) throw new Error(`No bin '${executable}' in module '${pkg}'`)
  debug("binPath: " + binPath)

  const fullPath = path.join(packageDir, binPath)
  debug("fullPath: " + fullPath)

  return fullPath
}

export type ServerEnvironment = "dev" | "prod"

export type ServerConfig = {
  rootFolder: string
  clean?: boolean
  // -
  isTypeScript?: boolean
  watch?: boolean
  // -
  port?: number
  hostname?: string
  inspect?: boolean
  // –
  env: ServerEnvironment
}

type NormalizedConfig = ServerConfig & {
  clean?: boolean
  // -
  isTypeScript: boolean
  watch: boolean
  // -
  nextBin: string
  env: ServerEnvironment
}

export const standardBuildFolderPath = ".blitz/build"
export const standardBuildFolderPathRegex = /\.blitz[\\/]build[\\/]/g

// https://stackoverflow.com/questions/20010199/how-to-determine-if-a-process-runs-inside-lxc-docker
function isInDocker(): boolean {
  const cgroupFile = join("proc", "self", "cgroup")
  if (fs.existsSync(cgroupFile)) {
    const content = fs.readFileSync(cgroupFile, "utf-8")
    return content.includes("docker")
  }
  return false
}

const defaults = {
  hostname: isInDocker() ? "0.0.0.0" : "127.0.0.1",
  // -
  env: "prod" as ServerEnvironment,
}

export async function normalize(config: ServerConfig): Promise<NormalizedConfig> {
  const rootFolder = resolve(process.cwd(), config.rootFolder)

  const env = config.env || defaults.env

  return {
    ...config,
    hostname: config.hostname ?? defaults.hostname,
    env,
    // -
    rootFolder,
    // -
    isTypeScript: config.isTypeScript ?? (await getIsTypeScript(rootFolder)),
    watch: config.watch ?? env === "dev",
    clean: config.clean,
    // -
    nextBin: await getCommandBin("next", rootFolder, env === "dev"),
  }
}

export async function getCommandBin(
  command: string,
  rootFolder: string = process.cwd(),
  _usePatched: boolean = false,
): Promise<string> {
  const bin = await resolveBinAsync(command)
  return resolve(rootFolder, bin)
}

async function getIsTypeScript(rootFolder: string): Promise<boolean> {
  try {
    await promises.access(join(rootFolder, "tsconfig.json"))
    return true
  } catch {
    return false
  }
}
