import { Card, Button, Text, Container } from "@chakra-ui/react"

const renderers = {
  card: Card,
  button: Button,
  text: Text,
  container: Container,
}

const definitions = {
  button: {
    type: "component",
    subType: "Button",
    template: {
      text: "Button",
      variant: "solid",
      size: "md",
      loading: false,
      disabled: false,
    },
    render: (props: any) => {
      return <Button {...props}>{props.text}</Button>
    },
  },
  card: {
    type: "component",
    subType: "Card",
    template: {
      title: "Card Title",
      description: "This is a description of the card.",
      slots: ["footer", "actions"],
      children: [],
    },
    render: (props: any) => {
      return (
        <Card.Root>
          {props.title ||
            (props.description && (
              <Card.Header>
                {props.title && <Card.Title>{props.title}</Card.Title>}
                {props.description && (
                  <Card.Description>{props.description}</Card.Description>
                )}
              </Card.Header>
            ))}
          {
            props.children && (
              <Card.Body>
                {props.children}
              </Card.Body>
            )
          }
          {
            props.footer && (
              <Card.Footer {...props.footer}>
                {props.footer}
              </Card.Footer>
            )
          }
        </Card.Root>
      )
    },
  },
  container: {
    type: "component",
    subType: "Container",
    template: {
      children: [],
    },
    render: (props: any) => (
      props.children && (
        <Container {...props}>
          {props.children}
        </Container>
      )
    )
  },
  text: {
    type: "component",
    subType: "Text",
    template: {
      value: "This is a Text component in the body of the card.",
    },
    render: (props: any) => {
      return <Text {...props}>{props.value}</Text>
    }
  },
}

const pageTemplate = {
  root: {
    id: "root",
    type: "frame",
    subtype: "Frame",
    template: {
      children: ["card1"],
    },
  },
  card1: {
    id: "card1",
    type: "component",
    subType: "Card",
    template: {
      title: "Card Title Page",
      description: "This is a description of the card in page.",
      footer: "card1_footer1",
      actions: "card1_actions1",
      children: ["text1"],
    },
  },
  card1_footer1: {
    id: "card1_footer1",
    type: "component",
    subType: "Container",
    template: {
      css: { justifyContent: "center" },
      children: ["button1"],
    },
  },
  card1_actions1: {
    id: "card1_actions1",
    type: "component",
    subType: "Container",
    template: {
      children: [],
    },
  },
  text1: {
    id: "text1",
    type: "component",
    subType: "Text",
    template: {
      value: "This is a Text component in the body of the card.",
    },
  },
  button1: {
    id: "button1",
    type: "component",
    subType: "Button",
    template: {
      text: "Button",
      variant: "solid",
      size: "md",
      loading: false,
      disabled: false,
    },
  },
}

const pageTree: any = [
  {
    id: "root",
    children: [
      {
        id: "card1",
        footer: {
          id: "card1_footer1",
          children: [
            {
              id: "button1",
            },
          ],
        },
        actions: {
          id: "card1_actions1",
          children: [],
        },
        children: [
          {
            id: "text1",
          },
        ],
      },
    ],
  },
]



export const RenderDynamic = () => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Render Dynamic</Card.Title>
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
