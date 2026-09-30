import { useContext } from "react"
import { LayerContext } from "./LayerProvider"
import { WidgetFactory } from "./WidgetFactory"

export function Widget({ widgetId }: { widgetId: string }) {
  const layoutMap = useContext(LayerContext)
  const widget = layoutMap[widgetId]

  if (!widget) return null

  return WidgetFactory.createWidget(widget, (childIds) =>
    childIds.map((childId) => <Widget key={childId} widgetId={childId} />),
  )
}
