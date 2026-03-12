import { Gtk } from "ags/gtk4"
import { type Accessor } from "gnim"

export default function PasswordEntry({
  onSubmit,
  sensitive,
}: {
  onSubmit: (password: string) => void
  sensitive: Accessor<boolean>
}) {
  let entryRef: Gtk.Entry | null = null

  return (
    <entry
      class="input-field password-entry"
      placeholderText="Password"
      visibility={false}
      halign={Gtk.Align.CENTER}
      sensitive={sensitive}
      onActivate={(self: Gtk.Entry) => {
        const text = self.text || ""
        onSubmit(text)
        self.text = ""
      }}
      $={(self: Gtk.Entry) => {
        entryRef = self
        self.connect("map", () => self.grab_focus())
      }}
    />
  )
}
