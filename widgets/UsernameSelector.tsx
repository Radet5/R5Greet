import { Gtk } from "ags/gtk4"
import { type Accessor } from "gnim"

export default function UsernameSelector({
  users,
  selected,
  onSelect,
}: {
  users: string[]
  selected: Accessor<string>
  onSelect: (user: string) => void
}) {
  if (users.length <= 1) {
    return (
      <label
        class="username-display"
        label={selected}
        halign={Gtk.Align.CENTER}
      />
    )
  }

  return (
    <menubutton
      class="input-field username-selector"
      halign={Gtk.Align.CENTER}
    >
      <box>
        <label
          class="username-display"
          label={selected}
          hexpand={true}
        />
        <image iconName="pan-down-symbolic" />
      </box>
      <popover>
        <box orientation={Gtk.Orientation.VERTICAL}>
          {users.map((user) => (
            <button onClicked={() => onSelect(user)}>
              <label label={user} />
            </button>
          ))}
        </box>
      </popover>
    </menubutton>
  )
}
