import type { CSSProperties, ReactNode } from "react"

export type WidgetType = "CARD_WIDGET" | "BUTTON_WIDGET" | "CONTAINER_WIDGET" | "TEXT_WIDGET"

export type CanvasWidget = {
  widgetId: string
  type: WidgetType
  title?: string
  description?: string
  text?: string
  variant?: "solid" | "outline" | "subtle" | "surface" | "plain"
  css?: CSSProperties
  /** The normal nested content of a widget. */
  children?: string[]
  /** Card-specific nested content; this demonstrates a second child location. */
  footer?: string[]
}

export type WidgetMap = Record<string, CanvasWidget>
export type RenderWidgetIds = (widgetIds: string[]) => ReactNode
