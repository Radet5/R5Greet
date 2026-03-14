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
    if (busy()) return;
    setError("");
    setBusy(true);

    const result = await login(
      selectedUser.peek(),
      password,
      config.session.command,
      config.session.env,
    )

    if (result) {
      setError(result.includes("AUTH_ERR") ? "Incorrect password" : result);
      setBusy(false);
    } else {
      app.quit();
    }
  }

    // const media = Gtk.MediaFile.new_for_filename("/etc/r5greet/background.mkv");
    // media.loop = true;
    // media.muted = true;
    // media.play();

  return (
    <box
      class="glass-panel login-panel"
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      overflow={Gtk.Overflow.HIDDEN}
    >
      <overlay>
        <box class="login-panel" />
        {
        // <Gtk.Picture
        //   $type="overlay"
        //   paintable={media}
        //   contentFit={Gtk.ContentFit.COVER}
        //   canShrink={true}
        //   halign={Gtk.Align.FILL}
        //   valign={Gtk.Align.FILL}
        // />
        }
        <box
          $type="overlay"
          class="login-panel-inner"
          orientation={Gtk.Orientation.VERTICAL}
          spacing={45}
          hexpand={true}
          vexpand={true}
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
      </overlay>
    </box>
  )
}
