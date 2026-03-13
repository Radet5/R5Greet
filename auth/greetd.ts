import GLib from "gi://GLib?version=2.0"
import Greet from "gi://AstalGreet"
import Gio from "gi://Gio?version=2.0"

const isMock = !GLib.getenv("GREETD_SOCK")

function greetdLogin(
  username: string,
  password: string,
  command: string,
  env: string[],
): Promise<string | null> {
  return new Promise((resolve) => {
    const callback: Gio.AsyncReadyCallback<string> = (_, res) => {
      try {
        if (env.length > 0) {
          Greet.login_with_env_finish(res)
        } else {
          Greet.login_finish(res)
        }
        resolve(null)
      } catch (e: any) {
        resolve(e?.message || String(e))
      }
    }

    if (env.length > 0) {
      Greet.login_with_env(username, password, command, env, callback)
    } else {
      Greet.login(username, password, command, callback)
    }
  })
}

export async function login(
  username: string,
  password: string,
  command: string,
  env: string[],
): Promise<string | null> {
  if (isMock) {
    console.log(`[mock auth] user=${username} pass=${"*".repeat(password.length)} cmd=${command}`)
    if (password === "") return "Password cannot be empty"
    return null
  }
  return greetdLogin(username, password, command, env)
}

export function poweroff(command: string): void {
  if (isMock) {
    console.log(`[mock power] ${command}`)
    return
  }
  try {
    GLib.spawn_command_line_async(command)
  } catch (e) {
    console.error("poweroff failed:", e)
  }
}
