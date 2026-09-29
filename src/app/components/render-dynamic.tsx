import { Card, Button, Text } from "@chakra-ui/react"


const plugins = [
  {
    name: "card",
    previewSchema: {
      type: "card",
      header: {
        title: "card",
        description: "Subtitle",
      },
      body: "Content",
    },
    scaffold: {
      type: "card",
      body: "Content",
    },
    isBaseComponent: true,
    pluginIcon: "card-plugin",
    rendererName: "card",
    id: "fde0bb5e56f6",
    plugin: {
      rendererName: "card",
      $schema: "/schemas/CardSchema.json",
      name: "card",
      regions: [
        {
          key: "header",
          label: "Content Area",
          renderMethod: "renderBody",
          preferTag: "display",
        },
        {
          key: "body",
          label: "Content Area",
          renderMethod: "renderBody",
          preferTag: "display",
        },
        {
          key: "body",
          label: "Content Area",
          renderMethod: "renderBody",
          preferTag: "display",
        },
        {
          key: "actions",
          label: "Button Group",
          renderMethod: "renderActions",
          preferTag: "button",
        },
      ],
      panelTitle: "Card",
      overrides: {},
      vRendererConfig: {
        panelTitle: "Fields",
      },
      order: 0,
    },
    order: 0,
  },
]

const renderers = {
  card: Card,
  button: Button,
  text: Text,
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
    }

  },
  card: {
    type: "component",
    subType: "Card",
    template: {
      title: "Card Title",
      description: "This is a description of the card.",
      children: [],
      footer: {},
    }
  },
  text: {
    type: "component",
    subType: "Text",
    template: {
      value: "This is a Text component in the body of the card.",
    }
  }
}

const componentsTree: any = [
  {
    id: "card1",
    children: [
      "text1",
    ]
  }
]


const components = {
  card1: {
    id: "card1",
    type: "component",
    subType: "Card",
  }
}

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
