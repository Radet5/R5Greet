import { Gtk } from "ags/gtk4"
import Gio from "gi://Gio?version=2.0"
import { type R5GreetConfig } from "../config/types"

const fitMap: Record<string, Gtk.ContentFit> = {
  cover: Gtk.ContentFit.COVER,
  contain: Gtk.ContentFit.CONTAIN,
  fill: Gtk.ContentFit.FILL,
}

export const Background = ({ config }: { config: R5GreetConfig }) => {
  const { background: { path, fit } } = config;

  const isVideo = /\.(mp4|webm|gif|mkv|avi)$/i.test(path)

  if (isVideo) {
    const media = Gtk.MediaFile.new_for_filename(path);
    media.loop = true;
    media.muted = true;
    media.play();

    return (
      <Gtk.Picture
        paintable={media}
        contentFit={fitMap[fit] ?? Gtk.ContentFit.COVER}
        canShrink={true}
        halign={Gtk.Align.FILL}
        valign={Gtk.Align.FILL}
        hexpand={true}
        vexpand={true}
      />
    );
  }

  return (
    <Gtk.Picture
      file={Gio.File.new_for_path(path)}
      contentFit={fitMap[fit] ?? Gtk.ContentFit.COVER}
      canShrink={true}
      halign={Gtk.Align.FILL}
      valign={Gtk.Align.FILL}
      hexpand={true}
      vexpand={true}
    />
  );
}
