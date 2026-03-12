import { Gtk } from "ags/gtk4"
import Gio from "gi://Gio?version=2.0"
import { type R5GreetConfig } from "../config/types"

const fitMap: Record<string, Gtk.ContentFit> = {
  cover: Gtk.ContentFit.COVER,
  contain: Gtk.ContentFit.CONTAIN,
  fill: Gtk.ContentFit.FILL,
}

export default function Background({ config }: { config: R5GreetConfig }) {
  return (
    <Gtk.Picture
      file={Gio.File.new_for_path(config.background.path)}
      contentFit={fitMap[config.background.fit] ?? Gtk.ContentFit.COVER}
      canShrink={true}
      halign={Gtk.Align.FILL}
      valign={Gtk.Align.FILL}
      hexpand={true}
      vexpand={true}
    />
  )
}
