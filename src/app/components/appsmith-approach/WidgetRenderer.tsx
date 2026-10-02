import { useContext } from "react"
import { ChildrenMapContext } from "./ChildrenMapContext"
import { WidgetFactory } from "./WidgetFactory"

export function WidgetRenderer({ widgetId }: { widgetId: string }) {
  const childrenMap = useContext(ChildrenMapContext)
  const widget = childrenMap[widgetId]

  if (!widget) return null

  return WidgetFactory.createWidget(widget, (childIds) =>
    childIds.map((childId) => <WidgetRenderer key={childId} widgetId={childId} />),
  )
}
