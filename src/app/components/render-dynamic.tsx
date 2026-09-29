import { Button, Card, Container, Text } from "@chakra-ui/react"
import { Fragment, type ReactNode } from "react"

type Properties = Record<string, unknown>
type TemplateNode = {
  id: string
  type: string
  subType?: string
  subtype?: string
  template?: Properties
}

/** A node in the layout tree. Slot values can be ids, nested nodes, or arrays of either. */
export type DynamicTreeNode = { id: string; [slot: string]: unknown }
type RenderComponent = (props: Properties, slots: Record<string, ReactNode>) => ReactNode

type Definition = {
  renderer: keyof typeof renderers
  template: Properties
  /** Named child locations, in addition to the always-supported `children` slot. */
  slots?: readonly string[]
}

// This is the only place that knows Chakra's component API. New component
// definitions only need to select a renderer and describe their slots/defaults.
const renderers = {
  button: (props, slots) => <Button {...props}>{slots.children}</Button>,
  text: (props, slots) => <Text {...props}>{slots.children}</Text>,
  container: (props, slots) => <Container {...props}>{slots.children}</Container>,
  frame: (props, slots) => <Container {...props}>{slots.children}</Container>,
  card: (props, slots) => {
    const { title, description, ...cardProps } = props
    const hasFooter = slots.footer !== null || slots.actions !== null

    return (
      <Card.Root {...cardProps}>
        {Boolean(title || description) && (
          <Card.Header>
            {Boolean(title) && <Card.Title>{title as ReactNode}</Card.Title>}
            {Boolean(description) && <Card.Description>{description as ReactNode}</Card.Description>}
          </Card.Header>
        )}
        {slots.children !== null && <Card.Body>{slots.children}</Card.Body>}
        {hasFooter && (
          <Card.Footer>
            {slots.footer}
            {slots.actions}
          </Card.Footer>
        )}
      </Card.Root>
    )
  },
} satisfies Record<string, RenderComponent>

const definitions = {
  Button: {
    renderer: "button",
    template: { text: "Button", variant: "solid", size: "md", loading: false, disabled: false },
  },
  Card: {
    renderer: "card",
    slots: ["footer", "actions"],
    template: {
      title: "Card Title",
      description: "This is a description of the card.",
      // Kept here for compatibility with definition data stored in this shape.
      slots: ["footer", "actions"],
      children: [],
    },
  },
  Container: { renderer: "container", template: { children: [] } },
  Frame: { renderer: "frame", template: { children: [], maxW: "container.md" } },
  Text: { renderer: "text", template: { value: "" } },
} satisfies Record<string, Definition>

const pageTemplate = {
  root: { id: "root", type: "frame", subType: "Frame", template: { children: ["card1"] } },
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
    template: { css: { justifyContent: "center" }, children: ["button1"] },
  },
  card1_actions1: { id: "card1_actions1", type: "component", subType: "Container", template: { children: [] } },
  text1: {
    id: "text1",
    type: "component",
    subType: "Text",
    template: { value: "This is a Text component in the body of the card." },
  },
  button1: {
    id: "button1",
    type: "component",
    subType: "Button",
    template: { text: "Button", variant: "solid", size: "md", loading: false, disabled: false },
  },
} satisfies Record<string, TemplateNode>

const pageTree: DynamicTreeNode[] = [
  {
    id: "root",
    children: [
      {
        id: "card1",
        footer: { id: "card1_footer1", children: [{ id: "button1" }] },
        actions: { id: "card1_actions1", children: [] },
        children: [{ id: "text1" }],
      },
    ],
  },
]

/**
 * Builds a renderer for any page-template map. `tree` controls hierarchy and
 * can override any slot; omitted slots fall back to the node's template.
 */
export function createDynamicRenderer(
  nodeTemplates: Record<string, TemplateNode>,
  componentDefinitions: Record<string, Definition>,
) {
  const resolveDefinition = (subType: string | undefined) =>
    subType && Object.entries(componentDefinitions).find(([name]) => name.toLowerCase() === subType.toLowerCase())?.[1]

  const renderValue = (value: unknown, ancestors: ReadonlySet<string>): ReactNode => {
    if (value === null || value === undefined || value === false) return null
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <Fragment key={typeof item === "object" && item && "id" in item ? String(item.id) : index}>
          {renderValue(item, ancestors)}
        </Fragment>
      ))
    }
    if (typeof value === "string" && nodeTemplates[value]) return renderNode({ id: value }, ancestors)
    if (typeof value === "object" && "id" in value) return renderNode(value as DynamicTreeNode, ancestors)
    return value as ReactNode
  }

  const renderNode = (treeNode: DynamicTreeNode, ancestors: ReadonlySet<string> = new Set<string>()): ReactNode => {
    const templateNode = nodeTemplates[treeNode.id]
    if (!templateNode) return null
    if (ancestors.has(treeNode.id)) {
      console.warn(`Dynamic renderer: circular reference at "${treeNode.id}".`)
      return null
    }

    const definition = resolveDefinition(templateNode.subType ?? templateNode.subtype)
    if (!definition) {
      console.warn(`Dynamic renderer: no definition for "${templateNode.subType ?? templateNode.subtype}".`)
      return null
    }

    const mergedTemplate = { ...definition.template, ...templateNode.template }
    const slotNames = new Set([
      "children",
      ...(definition.slots ?? []),
      ...((definition.template.slots as string[] | undefined) ?? []),
    ])
    const nextAncestors = new Set(ancestors).add(treeNode.id)
    const slots: Record<string, ReactNode> = {}

    for (const slot of slotNames) {
      // A tree value wins even when it is an empty array: that lets an editor
      // deliberately clear a template-provided slot.
      const source = Object.prototype.hasOwnProperty.call(treeNode, slot) ? treeNode[slot] : mergedTemplate[slot]
      slots[slot] = renderValue(source, nextAncestors)
    }

    const props = Object.fromEntries(
      Object.entries(mergedTemplate).filter(([key]) => !slotNames.has(key) && key !== "slots"),
    )

    // Text and Button store their visible content as ordinary template props;
    // convert it to the common children slot without leaking it to Chakra.
    if (definition.renderer === "text") {
      slots.children ??= mergedTemplate.value as ReactNode
      delete props.value
    }
    if (definition.renderer === "button") {
      slots.children ??= mergedTemplate.text as ReactNode
      delete props.text
    }

    return renderers[definition.renderer](props, slots)
  }

  return (tree: DynamicTreeNode | DynamicTreeNode[]) => renderValue(tree, new Set())
}

const renderPage = createDynamicRenderer(pageTemplate, definitions)

export const RenderDynamic = () => <>{renderPage(pageTree)}</>
