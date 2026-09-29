import { Container, HStack, Center } from "@chakra-ui/react"
import { RenderReact } from "./components/render-react"
import { RenderDynamic } from "./components/render-dynamic"

export default function Page() {
  return (
      <HStack css={{ w: "full", h: "100vh", bg: "bg.muted" }}>
        <Center css={{ flex: 1 }}>
          <RenderReact />
        </Center>
        <Center css={{ flex: 1 }}>
          <RenderDynamic />
        </Center>
      </HStack>
  )
}
