import { Stack } from "@chakra-ui/react"
import { ChildrenMapContext } from "./ChildrenMapContext"
import { WidgetRenderer } from "./WidgetRenderer"
import type { WidgetMap } from "./types"

export function LayoutProvider({ layout, widgets }: { layout: string[]; widgets: WidgetMap }) {
  // In Appsmith the map is built from evaluated canvas children. The layout only
  // holds ids and determines their order/nesting; it does not render a widget.
  return (
    <ChildrenMapContext.Provider value={widgets}>
      <Stack gap="4">
        {layout.map((widgetId) => (
          <WidgetRenderer key={widgetId} widgetId={widgetId} />
        ))}
      </Stack>
    </ChildrenMapContext.Provider>
  )
}
