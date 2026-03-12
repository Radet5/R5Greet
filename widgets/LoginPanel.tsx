import app from "ags/gtk4/app"
import { Gtk } from "ags/gtk4"
import { createState, createComputed } from "gnim"
import { type R5GreetConfig } from "../config/types"
import { login } from "../auth/greetd"
import UsernameSelector from "./UsernameSelector"
import PasswordEntry from "./PasswordEntry"

export default function LoginPanel({ config }: { config: R5GreetConfig }) {
  const users = config.users.list
  const [selectedUser, setSelectedUser] = createState(users[0] || "user")
  const [error, setError] = createState("")
  const [busy, setBusy] = createState(false)
  const notBusy = createComputed(() => !busy())
  const hasError = createComputed(() => error() !== "")

  async function handleLogin(password: string) {
    if (busy()) return
    setError("")
    setBusy(true)

    const result = await login(
      selectedUser.peek(),
      password,
      config.session.command,
      config.session.env,
    )

    if (result) {
      setError(result)
      setBusy(false)
    } else {
      // Greeter must exit so greetd can start the user session
      app.quit()
    }
  }

  return (
    <box
      class="glass-panel login-panel"
      orientation={Gtk.Orientation.VERTICAL}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      spacing={45}
    >
      <UsernameSelector
        users={users}
        selected={selectedUser}
        onSelect={setSelectedUser}
      />
      <PasswordEntry
        onSubmit={handleLogin}
        sensitive={notBusy}
      />
      <label
        class="error-label"
        label={error}
        visible={hasError}
        halign={Gtk.Align.CENTER}
      />
    </box>
  )
}
