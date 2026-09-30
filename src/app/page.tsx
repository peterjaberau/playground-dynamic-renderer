import { HStack, Center } from "@chakra-ui/react"
import { RenderReact } from "./components/render-react"
import { RenderDynamic } from "./components/render-dynamic"
import { AppsmithApproach } from "./components/appsmith-approach"

export default function Page() {
  return (
    <HStack css={{ w: "full", h: "100vh", bg: "bg.muted" }}>
      <Center css={{ flex: 1 }}>
        <RenderReact />
      </Center>
      <Center css={{ flex: 1 }}>
        <RenderDynamic />
      </Center>
      <Center css={{ flex: 1 }}>
        <AppsmithApproach />
      </Center>
    </HStack>
  )
}
