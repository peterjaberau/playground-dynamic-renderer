import { Button, Card, Container, Text } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { Layer } from "./Layer"
import type { CanvasWidget, RenderWidgetIds, WidgetType } from "./types"

type WidgetBuilder = (widget: CanvasWidget, renderWidgetIds: RenderWidgetIds) => ReactNode

// Appsmith registers each widget class once, then creates it from its `type`.
// The builders here deliberately contain only UI rendering responsibilities.
export class WidgetFactory {
  private static builders = new Map<WidgetType, WidgetBuilder>()

  static register(type: WidgetType, builder: WidgetBuilder) {
    this.builders.set(type, builder)
  }

  static createWidget(widget: CanvasWidget, renderWidgetIds: RenderWidgetIds) {
    const builder = this.builders.get(widget.type)
    if (!builder) return null

    return <Layer>{builder(widget, renderWidgetIds)}</Layer>
  }
}

WidgetFactory.register("TEXT_WIDGET", (widget) => <Text>{widget.text}</Text>)

WidgetFactory.register("BUTTON_WIDGET", (widget) => <Button variant={widget.variant}>{widget.text}</Button>)

WidgetFactory.register("CONTAINER_WIDGET", (widget, renderWidgetIds) => (
  <Container css={widget.css}>{renderWidgetIds(widget.children ?? [])}</Container>
))

WidgetFactory.register("CARD_WIDGET", (widget, renderWidgetIds) => (
  <Card.Root>
    {(widget.title || widget.description) && (
      <Card.Header>
        {widget.title && <Card.Title>{widget.title}</Card.Title>}
        {widget.description && <Card.Description>{widget.description}</Card.Description>}
      </Card.Header>
    )}
    <Card.Body>{renderWidgetIds(widget.children ?? [])}</Card.Body>
    {(widget.footer?.length ?? 0) > 0 && <Card.Footer>{renderWidgetIds(widget.footer ?? [])}</Card.Footer>}
  </Card.Root>
))
