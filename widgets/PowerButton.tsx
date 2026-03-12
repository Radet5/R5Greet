import { Gtk } from "ags/gtk4"
import { poweroff } from "../auth/greetd"

export default function PowerButton({ command }: { command: string }) {
  return (
    <button
      class="power-button"
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.END}
      marginBottom={33}
      onClicked={() => poweroff(command)}
      tooltipText="Power Off"
    >
      <image
        class="power-icon"
        iconName="system-shutdown-symbolic"
      />
    </button>
  )
}
