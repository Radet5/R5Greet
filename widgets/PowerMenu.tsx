import { Gtk } from "ags/gtk4"
import { type R5GreetConfig } from "../config/types"
import PowerButton from "./PowerButton"

export default function PowerMenu({ config }: { config: R5GreetConfig }) {
  return (
    <box
      orientation={Gtk.Orientation.HORIZONTAL}
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.END}
      marginBottom={33}
      spacing={16}
    >
      {config.actions.map((action) => (
        <PowerButton action={action} />
      ))}
    </box>
  )
}
