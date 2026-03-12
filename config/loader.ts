import GLib from "gi://GLib"
import { defaults } from "./defaults"
import { type R5GreetConfig } from "./types"

function parseTOML(text: string): Record<string, any> {
  const result: Record<string, any> = {}
  let current = result

  for (const raw of text.split("\n")) {
    const line = raw.trim()
    if (!line || line.startsWith("#")) continue

    const tableMatch = line.match(/^\[(.+)\]$/)
    if (tableMatch) {
      const key = tableMatch[1]
      result[key] = result[key] || {}
      current = result[key]
      continue
    }

    const kvMatch = line.match(/^(\w+)\s*=\s*(.+)$/)
    if (!kvMatch) continue

    const [, key, rawVal] = kvMatch
    const val = rawVal.trim()

    if (val.startsWith('"') && val.endsWith('"')) {
      current[key] = val.slice(1, -1)
    } else if (val.startsWith("[")) {
      // Simple array of strings
      current[key] = [...val.matchAll(/"([^"]*)"/g)].map((m) => m[1])
    } else if (val === "true") {
      current[key] = true
    } else if (val === "false") {
      current[key] = false
    } else {
      const num = Number(val)
      current[key] = isNaN(num) ? val : num
    }
  }

  return result
}

function deepMerge(target: any, source: any): any {
  const out = { ...target }
  for (const key of Object.keys(source)) {
    if (
      typeof source[key] === "object" &&
      source[key] !== null &&
      !Array.isArray(source[key]) &&
      typeof target[key] === "object"
    ) {
      out[key] = deepMerge(target[key], source[key])
    } else {
      out[key] = source[key]
    }
  }
  return out
}

const CONFIG_PATHS = [
  "/etc/r5greet/config.toml",
  `${GLib.get_home_dir()}/.config/r5greet/config.toml`,
]

export function loadConfig(): R5GreetConfig {
  for (const path of CONFIG_PATHS) {
    if (GLib.file_test(path, GLib.FileTest.EXISTS)) {
      try {
        const [ok, contents] = GLib.file_get_contents(path)
        if (ok && contents) {
          const text = new TextDecoder().decode(contents)
          const parsed = parseTOML(text)
          return deepMerge(defaults, parsed) as R5GreetConfig
        }
      } catch (e) {
        console.warn(`Failed to load config from ${path}:`, e)
      }
    }
  }
  return { ...defaults }
}
