"use client"

import { AnvilViewerCanvas } from "./AnvilViewerCanvas"
import type { WidgetMap } from "./types"

// This is the evaluated widget map that Appsmith would normally prepare before
// rendering. It is flat: nesting is expressed by widget ids in `children`.
const widgets: WidgetMap = {
  card1: {
    widgetId: "card1",
    type: "CARD_WIDGET",
    title: "Appsmith approach",
    description: "Canvas → context → renderer → factory → widget layers",
    children: ["text1"],
    footer: ["footer1"],
  },
  text1: {
    widgetId: "text1",
    type: "TEXT_WIDGET",
    text: "The CardWidget asks the shared context to render this widget by id.",
  },
  footer1: {
    widgetId: "footer1",
    type: "CONTAINER_WIDGET",
    css: { display: "flex", justifyContent: "center" },
    children: ["button1"],
  },
  button1: { widgetId: "button1", type: "BUTTON_WIDGET", text: "Button", variant: "solid" },
}

export function AppsmithApproach() {
  return <AnvilViewerCanvas layout={["card1"]} widgets={widgets} />
}
