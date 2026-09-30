import { Container } from "@chakra-ui/react"
import { LayerProvider } from "./LayerProvider"
import type { WidgetMap } from "./types"

export function Viewer({ layout, widgets }: { layout: string[]; widgets: WidgetMap }) {
  return (
    <Container maxW="container.md">
      <LayerProvider layout={layout} widgets={widgets} />
    </Container>
  )
}
