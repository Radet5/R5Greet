import app from "ags/gtk4/app"
import style from "./style.css"
import { loadConfig } from "./config/loader"
import { type R5GreetConfig } from "./config/types"
import GreeterWindow from "./widgets/GreeterWindow"

function generateThemeCss(theme: R5GreetConfig["theme"]): string {
  return `
.glass-panel {
  background-color: ${theme.panel_bg};
  border-right: 1px solid ${theme.panel_border};
  border-bottom: 1px solid ${theme.panel_border};
  border-radius: 10px;
  box-shadow: 6px 6px 4px rgba(0, 0, 0, 0.25);
}

.input-field {
  background-color: ${theme.input_bg};
  border-right: 1px solid ${theme.input_border};
  border-bottom: 1px solid ${theme.input_border};
  border-radius: 10px;
}

.clock-text {
  color: ${theme.text_color};
  font-family: "${theme.clock_font_family}";
  font-size: 40px;
  font-weight: 500;
}

.username-display {
  color: ${theme.text_color};
  font-family: "${theme.font_family}";
  font-size: 40px;
  font-weight: 500;
}

.power-icon {
  color: ${theme.text_color};
}

.error-label {
  color: #ff6b6b;
}
`
}

const config = loadConfig()

app.start({
  instanceName: "r5greet",
  css: style + generateThemeCss(config.theme),
  main() {
    GreeterWindow({ config })
  },
})
