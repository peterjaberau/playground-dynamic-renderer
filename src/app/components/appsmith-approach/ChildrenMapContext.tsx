import { createContext } from "react"
import type { WidgetMap } from "./types"

// Same role as Appsmith's ChildrenMapContext: widget renderers look up their
// already-evaluated widget data by id instead of receiving every child as props.
export const ChildrenMapContext = createContext<WidgetMap>({})
