import { Card, Button, Text } from "@chakra-ui/react"

export const RenderReact = () => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Render React</Card.Title>
        <Card.Description>This is a description of the card.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Text>This is a Text component in the body of the card.</Text>
      </Card.Body>
      <Card.Footer css={{ justifyContent: "center" }}>
        <Button>Button</Button>
      </Card.Footer>
    </Card.Root>
  )
}