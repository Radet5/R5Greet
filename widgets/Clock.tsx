import { Gtk } from "ags/gtk4"
import { createPoll } from "ags/time"
import GLib from "gi://GLib?version=2.0"
import { type R5GreetConfig } from "../config/types"

export default function Clock({ config }: { config: R5GreetConfig }) {
  const time = createPoll("", 1000, () => {
    const now = config.clock.timezone
      ? GLib.DateTime.new_now(GLib.TimeZone.new(config.clock.timezone))
      : GLib.DateTime.new_now_local()
    return now?.format(config.clock.format)?.toUpperCase() ?? ""
  })

  return (
    <box
      class="glass-panel clock-panel"
      halign={Gtk.Align.CENTER}
      valign={Gtk.Align.START}
      marginTop={165}
    >
      <label
        class="clock-text"
        label={time}
        halign={Gtk.Align.CENTER}
        valign={Gtk.Align.CENTER}
        hexpand
        vexpand
      />
    </box>
  )
}
