import { type R5GreetConfig } from "./types"

export const defaults: R5GreetConfig = {
  background: {
    path: "/etc/r5greet/background.jpg",
    fit: "cover",
  },
  clock: {
    format: "%a %H:%M",
  },
  actions: [
    {
      name: "Power Off",
      icon: "system-shutdown-symbolic",
      command: "systemctl poweroff",
    },
  ],
  session: {
    command: "uwsm start hyprland-uwsm.desktop",
    env: [],
  },
  theme: {
    panel_bg: "rgba(204, 204, 204, 0.1)",
    panel_border: "#83d4ff",
    panel_radius: "10px",
    panel_shadow: "6px 6px 4px rgba(0, 0, 0, 0.25)",
    input_bg: "rgba(61, 61, 61, 0.3)",
    input_border: "rgba(131, 212, 255, 0.5)",
    input_radius: "10px",
    text_color: "#c2fcff",
    font_family: "Chakra Petch",
    font_size: "40px",
    font_weight: "500",
    clock_font_family: "Chakra Petch",
    clock_font_size: "40px",
    clock_font_weight: "500",
    error_color: "#ff6b6b",
  },
  users: {
    list: ["radet"],
  },
}
