import { Container } from "@chakra-ui/react"
import { LayoutProvider } from "./LayoutProvider"
import type { WidgetMap } from "./types"

export function AnvilViewerCanvas({ layout, widgets }: { layout: string[]; widgets: WidgetMap }) {
  return (
    <Container maxW="container.md">
      <LayoutProvider layout={layout} widgets={widgets} />
    </Container>
  )
}
