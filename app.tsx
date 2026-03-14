import GLib from "gi://GLib"
import app from "ags/gtk4/app"
import style from "./style.css"
import { loadConfig } from "./config/loader"
import { type R5GreetConfig } from "./config/types"
import GreeterWindow from "./widgets/GreeterWindow"

function loadCustomCss(value: string): string {
  if (value.startsWith("/") || value.startsWith("~")) {
    const path = value.startsWith("~")
      ? value.replace("~", GLib.get_home_dir() ?? "")
      : value
    try {
      const [ok, contents] = GLib.file_get_contents(path)
      if (ok && contents) return new TextDecoder().decode(contents)
    } catch (e) {
      console.warn("Failed to load custom_css from", path, e)
    }
    return ""
  }
  return value
}

function generateThemeCss(theme: R5GreetConfig["theme"]): string {
  const vars = `
:root {
  --panel-bg: ${theme.panel_bg};
  --panel-border: ${theme.panel_border};
  --panel-radius: ${theme.panel_radius};
  --panel-shadow: ${theme.panel_shadow};
  --input-bg: ${theme.input_bg};
  --input-border: ${theme.input_border};
  --input-radius: ${theme.input_radius};
  --text-color: ${theme.text_color};
  --font-family: ${theme.font_family};
  --font-size: ${theme.font_size};
  --font-weight: ${theme.font_weight};
  --clock-font-family: ${theme.clock_font_family};
  --clock-font-size: ${theme.clock_font_size};
  --clock-font-weight: ${theme.clock_font_weight};
  --error-color: ${theme.error_color};
}
`
  const customCss = theme.custom_css ? loadCustomCss(theme.custom_css) : ""
  return vars + customCss
}

const config = loadConfig()

app.start({
  instanceName: "r5greet",
  css: generateThemeCss(config.theme) + style,
  main() {
    <GreeterWindow config={config} />
  },
})
