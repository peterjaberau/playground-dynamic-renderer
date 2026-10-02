import { Box } from "@chakra-ui/react"
import type { ReactNode } from "react"

export function AnvilWidgetComponent({ children }: { children: ReactNode }) {
  // Appsmith also adds loading/error behavior at this layer.
  return <>{children}</>
}

export function AnvilViewerWidgetOnion({ children }: { children: ReactNode }) {
  // Appsmith's viewer onion adds layout sizing here. This is the minimal equivalent.
  return <Box w="full">{children}</Box>
}

export function AnvilViewerWrapper({ children }: { children: ReactNode }) {
  return (
    <AnvilViewerWidgetOnion>
      <AnvilWidgetComponent>{children}</AnvilWidgetComponent>
    </AnvilViewerWidgetOnion>
  )
}
