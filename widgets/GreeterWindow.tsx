import app from "ags/gtk4/app"
import { Astal, Gtk } from "ags/gtk4"
import { type R5GreetConfig } from "../config/types"
import Background from "./Background"
import Clock from "./Clock"
import LoginPanel from "./LoginPanel"
import PowerButton from "./PowerButton"

export default function GreeterWindow({ config }: { config: R5GreetConfig }) {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      visible
      name="r5greet"
      namespace="r5greet"
      application={app}
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      layer={Astal.Layer.TOP}
      keymode={Astal.Keymode.EXCLUSIVE}
    >
      <overlay>
        <Background config={config} />
        <Clock $type="overlay" config={config} />
        <LoginPanel $type="overlay" config={config} />
        <PowerButton $type="overlay" command={config.commands.poweroff} />
      </overlay>
    </window>
  )
}
