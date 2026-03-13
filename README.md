# R5Greet

A glassmorphism-styled [greetd](https://sr.ht/~kennylevinsen/greetd/) greeter built with [AGS v2](https://github.com/Aylur/ags) (Astal + TypeScript/TSX) for Hyprland.

## Features

- Glassmorphism panels with Hyprland compositor blur
- Configurable wallpaper background
- Live clock with customizable format and timezone
- Single or multi-user login with dropdown selector
- Configurable power/reboot/suspend action buttons
- Full theme customization via TOML config and CSS custom properties
- Custom CSS override support

## Dependencies

- [ags](https://github.com/Aylur/ags) v3.x
- [libastal-4-git](https://aur.archlinux.org/packages/libastal-4-git), [libastal-io-git](https://aur.archlinux.org/packages/libastal-io-git), [libastal-greetd-git](https://aur.archlinux.org/packages/libastal-greetd-git) (AUR)
- [greetd](https://sr.ht/~kennylevinsen/greetd/)
- [Hyprland](https://hyprland.org/) 0.54+
- Fonts: [Jura](https://aur.archlinux.org/packages/jura-font)

## Dev Setup

link node_modules and generate types

```sh
make dev
```

## Install

link node_modules

```sh
make setup
```

Build and install

```sh
make install
make install-config
```

Place your wallpaper at `/etc/r5greet/background.jpg` (or change the path in config).

Configure greetd to launch R5Greet via Hyprland in `/etc/greetd/config.toml`:

```toml
[default_session]
command = "start-hyprland -- -c /etc/greetd/r5greet-hyprland.conf"
```

## Configuration

Config is loaded from `/etc/r5greet/config.toml`. All fields have sensible defaults.

### Background

```toml
[background]
path = "/etc/r5greet/background.jpg"
fit = "cover"  # "cover", "contain", or "fill"
```

### Clock

```toml
[clock]
format = "%a %H:%M"
timezone = "America/New_York"
```

Format uses [GLib datetime format codes](https://docs.gtk.org/glib/method.DateTime.format.html).

### Actions

Action buttons appear at the bottom of the screen. Each `[[actions]]` block adds a button with an icon and shell command.

```toml
[[actions]]
name = "Power Off"
icon = "system-shutdown-symbolic"
command = "systemctl poweroff"

[[actions]]
name = "Reboot"
icon = "system-reboot-symbolic"
command = "systemctl reboot"

[[actions]]
name = "Suspend"
icon = "system-suspend-symbolic"
command = "systemctl suspend"
```

### Session

```toml
[session]
command = "uwsm start hyprland-uwsm.desktop"
```

### Users

```toml
[users]
list = ["alice"]           # single user — shown as a label
# list = ["alice", "bob"]  # multiple users — shown as a dropdown
```

### Theme

All theme values map to CSS custom properties used throughout `style.css`.

```toml
[theme]
# Panel glassmorphism
panel_bg = "rgba(204, 204, 204, 0.1)"
panel_border = "#83d4ff"
panel_radius = "10px"
panel_shadow = "6px 6px 4px rgba(0, 0, 0, 0.25)"

# Input fields
input_bg = "rgba(61, 61, 61, 0.3)"
input_border = "rgba(131, 212, 255, 0.5)"
input_radius = "10px"

# Typography
text_color = "#c2fcff"
font_family = "Jura"
font_size = "40px"
font_weight = "500"
clock_font_family = "Jura"
clock_font_size = "40px"
clock_font_weight = "500"
error_color = "#ff6b6b"
```

Values accept any valid GTK4 CSS — `panel_bg` can be a solid color, gradient, or image.

### Custom CSS

For full control beyond theme variables, point `custom_css` at a CSS file:

```toml
[theme]
custom_css = "/etc/r5greet/custom.css"
```

This CSS is appended after all other styles, so it can override any rule in `style.css`. You can also pass inline CSS directly:

```toml
[theme]
custom_css = ".login-panel { min-width: 600px; }"
```

## License

GPL 3.0
