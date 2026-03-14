import app from "ags/gtk4/app"
import { Astal, Gtk } from "ags/gtk4"
import { type R5GreetConfig } from "../config/types"
import { Background } from "./Background"
import Clock from "./Clock"
import LoginPanel from "./LoginPanel"
import PowerMenu from "./PowerMenu"

function BackgroundWindow({ config }: { config: R5GreetConfig }) {
  const { TOP, BOTTOM, LEFT, RIGHT } = Astal.WindowAnchor

  return (
    <window
      name="r5greet-bg"
      namespace="r5greet-bg"
      application={app}
      anchor={TOP | BOTTOM | LEFT | RIGHT}
      exclusivity={Astal.Exclusivity.IGNORE}
      keymode={Astal.Keymode.NONE}
      layer={Astal.Layer.BOTTOM}
      $={(self: any) => { self.visible = true }}
    >
      <Background config={config} />
    </window>
  )
}

function PanelsWindow({ config }: { config: R5GreetConfig }) {
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
        <box hexpand vexpand />
        <Clock $type="overlay" config={config} />
        <LoginPanel $type="overlay" config={config} />
        <PowerMenu $type="overlay" config={config} />
      </overlay>
    </window>
  )
}

export default function GreeterWindow({ config }: { config: R5GreetConfig }) {
  return <>
    <BackgroundWindow config={config} />
    <PanelsWindow config={config} />
  </>
}
