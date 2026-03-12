import { Gtk } from "ags/gtk4"
import { poweroff } from "../auth/greetd"
import { type PowerAction } from "../config/types"

export default function PowerButton({ action }: { action: PowerAction }) {
  return (
    <button
      class="power-button"
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.CENTER}
      onClicked={() => poweroff(action.command)}
      tooltipText={action.name}
    >
      <image
        class="power-icon"
        iconName={action.icon}
        pixelSize={32}
      />
    </button>
  )
}
