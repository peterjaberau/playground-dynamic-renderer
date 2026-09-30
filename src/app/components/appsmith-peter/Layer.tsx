import type { ReactNode } from "react"

export function Layer({ children }: { children: ReactNode }) {
  return <Layer>{children}</Layer>
}
