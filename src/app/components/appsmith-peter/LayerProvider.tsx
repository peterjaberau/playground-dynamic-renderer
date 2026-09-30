import { Stack } from "@chakra-ui/react"
import { Widget } from "./Widget"
import type { WidgetMap } from "./types"
import { createContext } from "react"

export const LayerContext = createContext<WidgetMap>({})

export function LayerProvider({ layout, widgets }: { layout: string[]; widgets: WidgetMap }) {
  return (
    <LayerContext.Provider value={widgets}>
      <Stack gap="4">
        {layout.map((widgetId) => (
          <Widget key={widgetId} widgetId={widgetId} />
        ))}
      </Stack>
    </LayerContext.Provider>
  )
}
