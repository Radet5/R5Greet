export interface R5GreetConfig {
  background: {
    path: string
    fit: "cover" | "contain" | "fill"
  }
  clock: {
    format: string
    timezone?: string
  }
  commands: {
    poweroff: string
  }
  session: {
    command: string
    env: string[]
  }
  theme: {
    panel_bg: string
    panel_border: string
    input_bg: string
    input_border: string
    text_color: string
    font_family: string
    clock_font_family: string
  }
  users: {
    list: string[]
  }
}
