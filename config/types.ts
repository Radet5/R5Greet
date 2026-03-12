export interface PowerAction {
  name: string
  icon: string
  command: string
}

export interface R5GreetConfig {
  background: {
    path: string
    fit: "cover" | "contain" | "fill"
  }
  clock: {
    format: string
    timezone?: string
  }
  commands?: {
    poweroff: string
  }
  actions: PowerAction[]
  session: {
    command: string
    env: string[]
  }
  theme: {
    panel_bg: string
    panel_border: string
    panel_radius: string
    panel_shadow: string
    input_bg: string
    input_border: string
    input_radius: string
    text_color: string
    font_family: string
    font_size: string
    font_weight: string
    clock_font_family: string
    clock_font_size: string
    clock_font_weight: string
    error_color: string
    custom_css?: string
  }
  users: {
    list: string[]
  }
}
