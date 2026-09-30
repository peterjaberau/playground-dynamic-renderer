# Appsmith-style rendering, reduced

This folder is a small rendering-only version of the Appsmith viewer flow. It deliberately leaves out Redux, evaluated bindings, editor controls, events, loading states, errors, and layout measurement.

The rendering path is:

```text
AnvilViewerCanvas
  → LayoutProvider
    → ChildrenMapContext
      → WidgetRenderer
        → WidgetFactory
          → AnvilViewerWrapper
            → AnvilViewerWidgetOnion
              → AnvilWidgetComponent
                → Chakra widget
```

The important Appsmith idea is that the widget data is a flat map, rather than a deeply nested object. A widget stores the ids of its children. `LayoutProvider` puts the map in `ChildrenMapContext`; every `WidgetRenderer` reads one id from that context, asks `WidgetFactory` to create it, and recursively renders its child ids.

## Page structure

`AppsmithApproach` gives the canvas the root layout and the flat widget map:

```tsx
<AppsmithApproach>
  <AnvilViewerCanvas layout={["card1"]} widgets={widgets} />
</AppsmithApproach>
```

The canvas provides the context and starts the first widget renderer:

```tsx
<AnvilViewerCanvas>
  <Container>
    <LayoutProvider>
      <ChildrenMapContext.Provider value={widgets}>
        <Stack>
          <WidgetRenderer widgetId="card1" />
        </Stack>
      </ChildrenMapContext.Provider>
    </LayoutProvider>
  </Container>
</AnvilViewerCanvas>
```

`WidgetRenderer` does not add a visual DOM wrapper. Its output comes from the factory:

```tsx
<WidgetRenderer widgetId="card1">
  <WidgetFactory.createWidget widget={widgets.card1}>
    <AnvilViewerWrapper>
      <AnvilViewerWidgetOnion>
        <Box>
          <AnvilWidgetComponent>{/* the Card widget implementation */}</AnvilWidgetComponent>
        </Box>
      </AnvilViewerWidgetOnion>
    </AnvilViewerWrapper>
  </WidgetFactory.createWidget>
</WidgetRenderer>
```

The `WidgetFactory.createWidget(...)` syntax above is explanatory rather than valid JSX: it is a function that returns the nested JSX beneath it.

## Nested Card example

For the example data, `card1` has `children: ["text1"]` and `footer: ["footer1"]`; `footer1` has `children: ["button1"]`.

The resulting component tree is:

```tsx
<Viewer>
  <Container>
    <LayerProvider>
      <LayerContext.Provider value={widgets}>
          <Widget widgetId="card1">
            <Layer>
                    <Card.Root>
                      <Card.Header>
                        <Card.Title>Appsmith approach</Card.Title>
                        <Card.Description>...</Card.Description>
                      </Card.Header>

                      <Card.Body>
                        <Widget widgetId="text1">
                          <Layer>
                                  <Text>...</Text>
                          </Layer>
                        </Widget>
                      </Card.Body>

                      <Card.Footer>
                        <Widget widgetId="footer1">
                          <Layer>
                                  <Container>
                                    <Widget widgetId="button1">
                                      <Layer>
                                              <Button>Button</Button>
                                      </Layer>
                                    </Widget>
                                  </Container>
                          </Layer>
                        </Widget>
                      </Card.Footer>
                    </Card.Root>
            </Layer>
          </Widget>
      </LayerContext.Provider>
    </LayerProvider>
  </Container>
</Viewer>
```

In real React output, `WidgetRenderer`, `WidgetFactory`, `LayoutProvider`, and `ChildrenMapContext.Provider` are component/function layers rather than browser DOM elements. `Box`, `Container`, `Card.*`, `Text`, and `Button` create the visible Chakra UI DOM.
