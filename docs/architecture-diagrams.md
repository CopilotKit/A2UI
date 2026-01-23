# A2UI Architecture Diagrams

## 1. React Renderer Architecture

The React renderer uses a two-context architecture for performance optimization.

```mermaid
flowchart TB
    subgraph Application["Application Layer"]
        App["App Component"]
        WS["WebSocket/SSE Transport"]
    end

    subgraph Provider["A2UIProvider"]
        direction TB
        Processor["Message Processor<br/>(from @a2ui/lit)"]

        subgraph Contexts["Two-Context Architecture"]
            ActionsCtx["A2UIActionsContext<br/>(Stable - No Re-renders)"]
            StateCtx["A2UIStateContext<br/>(Reactive - version counter)"]
        end

        subgraph Actions["Stable Actions (useRef)"]
            processMessages["processMessages()"]
            setData["setData()"]
            dispatch["dispatch()"]
            getData["getData()"]
            getSurface["getSurface()"]
            resolvePath["resolvePath()"]
        end
    end

    subgraph Theme["ThemeProvider"]
        ThemeCtx["ThemeContext"]
        LitTheme["litTheme (default)"]
    end

    subgraph Rendering["Rendering Layer"]
        Renderer["A2UIRenderer<br/>(renders surface by ID)"]
        Viewer["A2UIViewer<br/>(standalone static)"]
        CompNode["ComponentNode<br/>(recursive rendering)"]
    end

    subgraph Hooks["Hooks"]
        useA2UI["useA2UI()<br/>(high-level API)"]
        useA2UIComp["useA2UIComponent()<br/>(component helper)"]
        useActions["useA2UIActions()<br/>(stable, no re-render)"]
        useState["useA2UIState()<br/>(reactive)"]
        useTheme["useTheme()"]
    end

    subgraph Components["UI Components (React.memo)"]
        Content["Content<br/>Text, Icon, Image..."]
        Interactive["Interactive<br/>Button, TextField..."]
        Layout["Layout<br/>Row, Column, Card..."]
    end

    App --> Provider
    WS --> processMessages
    Provider --> Processor
    Processor --> ActionsCtx
    Processor --> StateCtx
    ActionsCtx --> Actions
    Provider --> Theme
    Theme --> Rendering

    Renderer --> CompNode
    Viewer --> Renderer
    CompNode --> Components

    useA2UI --> useActions
    useA2UI --> useState
    useA2UIComp --> useActions
    useA2UIComp --> useTheme

    Components --> useA2UIComp
    Renderer --> useA2UI
```

---

## 2. Data Flow Diagram

Shows how messages flow from AI agents through the system to rendered UI.

```mermaid
sequenceDiagram
    participant Agent as AI Agent
    participant Transport as Transport Layer<br/>(WebSocket/SSE)
    participant App as Application
    participant Provider as A2UIProvider
    participant Processor as MessageProcessor
    participant State as StateContext
    participant Renderer as A2UIRenderer
    participant Node as ComponentNode
    participant Comp as UI Component

    Note over Agent,Comp: Server → Client Flow

    Agent->>Transport: JSON Messages
    Note right of Agent: createSurface<br/>updateComponents<br/>updateDataModel

    Transport->>App: Receive messages
    App->>Provider: processMessages([...])
    Provider->>Processor: processor.processMessages()

    Note over Processor: Parse messages<br/>Update surfaces Map<br/>Build component trees<br/>Store data model

    Processor->>State: setVersion(v + 1)
    State->>Renderer: Re-render triggered
    Renderer->>Renderer: getSurface(surfaceId)
    Renderer->>Node: Render componentTree

    loop For each node in tree
        Node->>Node: Get component from registry
        Node->>Comp: Render with props
        Comp->>Comp: useA2UIComponent()
        Comp->>Processor: resolveString/Number/Boolean
        Processor-->>Comp: Resolved value
        Comp->>Comp: Render UI
    end

    Note over Agent,Comp: Client → Server Flow (User Actions)

    Comp->>Comp: User clicks/types
    Comp->>Provider: sendAction(action)
    Provider->>Provider: Resolve context bindings
    Provider->>App: onAction callback

    Note right of App: {<br/>  action: {<br/>    name, surfaceId,<br/>    sourceComponentId,<br/>    timestamp, context<br/>  }<br/>}

    App->>Transport: Send to server
    Transport->>Agent: User action received

    Note over Agent,Comp: Two-Way Data Binding

    Comp->>Comp: User types in TextField
    Comp->>Provider: setValue(path, value)
    Provider->>Processor: processor.setData()
    Processor->>State: setVersion(v + 1)
    State->>Renderer: Re-render
    Note over Renderer,Comp: Other components<br/>bound to same path<br/>receive new value
```

---

## 3. Component Hierarchy

Organization of UI components by category.

```mermaid
flowchart TB
    subgraph Registry["ComponentRegistry (Singleton)"]
        direction TB
        RegAPI["register() | get() | has()<br/>unregister() | clear()"]
        LazyCache["Lazy Component Cache<br/>(React.lazy wrapper)"]
    end

    subgraph Catalog["Default Catalog"]
        Init["initializeDefaultCatalog()"]
    end

    subgraph Content["Content Components"]
        direction TB
        Text["Text<br/>Markdown rendering<br/>Usage hints: h1-h5, body, caption"]
        Icon["Icon<br/>Material Symbols"]
        Image["Image<br/>Image display"]
        Divider["Divider<br/>Visual separator"]
        Video["Video<br/>Video player"]
        Audio["AudioPlayer<br/>Audio playback"]
    end

    subgraph Interactive["Interactive Components"]
        direction TB
        Button["Button<br/>Action dispatch"]
        TextField["TextField<br/>Text input + validation<br/>Two-way binding"]
        CheckBox["CheckBox<br/>Boolean toggle<br/>Two-way binding"]
        Slider["Slider<br/>Numeric range"]
        DateTime["DateTimeInput<br/>Date/time picker"]
        Choice["MultipleChoice<br/>Radio/select list"]
    end

    subgraph Layout["Layout Components"]
        direction TB
        Row["Row<br/>Horizontal flexbox"]
        Column["Column<br/>Vertical flexbox"]
        Card["Card<br/>Container with styling"]
        List["List<br/>Scrollable container"]
        Tabs["Tabs (lazy)<br/>Tabbed interface"]
        Modal["Modal (lazy)<br/>Modal dialog"]
    end

    subgraph Patterns["Component Patterns"]
        Memo["React.memo()<br/>All components wrapped"]
        Hook["useA2UIComponent()<br/>Data binding & theme"]
        Props["A2UIComponentProps&lt;T&gt;<br/>node + surfaceId"]
    end

    Catalog --> Registry
    Registry --> Content
    Registry --> Interactive
    Registry --> Layout

    Content --> Patterns
    Interactive --> Patterns
    Layout --> Patterns

    style Tabs fill:#f9f,stroke:#333
    style Modal fill:#f9f,stroke:#333
```

---

## 4. Cross-Renderer Architecture

How different renderers relate to the A2UI specification.

```mermaid
flowchart TB
    subgraph Agents["AI Agents"]
        LLM["LLM / Backend"]
    end

    subgraph Specification["A2UI Specification (v0.9)"]
        direction TB
        Protocol["a2ui_protocol.md<br/>Core protocol definition"]

        subgraph Schemas["JSON Schemas"]
            S2C["server_to_client.json<br/>Message envelopes"]
            C2S["client_to_server.json<br/>User actions"]
            Catalog["standard_catalog.json<br/>Component definitions"]
            Common["common_types.json<br/>Shared primitives"]
        end
    end

    subgraph Transport["Transport Layer"]
        A2A["A2A Protocol"]
        AGUI["AG-UI Protocol"]
        WS["WebSocket"]
        SSE["Server-Sent Events"]
    end

    subgraph Core["Shared Core (@a2ui/lit)"]
        direction TB
        MsgProc["Message Processor<br/>signal-model-processor.ts"]
        Types["Type Definitions<br/>Types.*, Primitives.*"]
        DataProc["Data Processing<br/>model-processor.ts"]
        Guards["Type Guards<br/>guards.ts"]
    end

    subgraph Renderers["Framework Renderers"]
        direction TB

        subgraph React["React Renderer (@a2ui/react)"]
            ReactProv["A2UIProvider<br/>Two-context architecture"]
            ReactRend["A2UIRenderer"]
            ReactComp["React Components<br/>(memo wrapped)"]
        end

        subgraph Lit["Lit Renderer (@a2ui/lit)"]
            LitProc["MessageProcessor"]
            LitUI["Web Components<br/>(Shadow DOM)"]
        end

        subgraph Angular["Angular Renderer (@a2ui/angular)"]
            AngProv["provideA2UI()<br/>DI configuration"]
            AngComp["Angular Components"]
        end

        subgraph Flutter["Flutter Renderer"]
            GenUI["genui package"]
            A2UIAdapter["genui_a2ui adapter"]
        end
    end

    subgraph Testing["Visual Parity Testing"]
        Fixtures["Test Fixtures<br/>(A2UI payloads)"]
        Compare["Pixel Comparison<br/>Lit = Reference"]
    end

    Agents --> Specification
    Specification --> Transport
    Transport --> Core

    Core --> React
    Core --> Lit
    Core --> Angular
    Core --> Flutter

    React --> Testing
    Lit --> Testing

    linkStyle 4,5,6,7 stroke:#00f,stroke-width:2px
```

---

## Dependency Graph

```mermaid
flowchart LR
    subgraph Packages["NPM Packages"]
        LitPkg["@a2ui/lit<br/>Core + Reference"]
        ReactPkg["@a2ui/react"]
        AngularPkg["@a2ui/angular"]
    end

    subgraph External["External Dependencies"]
        ReactLib["react<br/>react-dom"]
        LitLib["lit<br/>@lit-labs/signals<br/>@lit/context"]
        AngularLib["@angular/core<br/>@angular/common"]
        MD["markdown-it"]
    end

    ReactPkg -->|"workspace:*"| LitPkg
    AngularPkg -->|"file reference"| LitPkg

    LitPkg --> LitLib
    LitPkg --> MD
    ReactPkg --> ReactLib
    AngularPkg --> AngularLib

    style LitPkg fill:#f96,stroke:#333,stroke-width:2px
```

---

## State Management Flow

```mermaid
stateDiagram-v2
    [*] --> Idle: App initialized

    Idle --> Processing: processMessages() called
    Processing --> Updated: Processor updates internal state
    Updated --> Rendering: setVersion(v + 1)
    Rendering --> Idle: Components re-rendered

    Idle --> UserAction: User interacts
    UserAction --> DataUpdate: setValue() for two-way binding
    DataUpdate --> Updated: Processor.setData()

    UserAction --> ActionDispatch: sendAction()
    ActionDispatch --> Idle: onAction callback invoked

    note right of Processing
        Messages parsed:
        - createSurface
        - updateComponents
        - updateDataModel
        - deleteSurface
    end note

    note right of Rendering
        Only components using
        useA2UIState() re-render
    end note
```

---

## Usage

These diagrams can be rendered using:
- **GitHub/GitLab**: Automatically renders in markdown preview
- **VS Code**: Install "Markdown Preview Mermaid Support" extension
- **Online**: Use [mermaid.live](https://mermaid.live) to edit and export
- **Documentation tools**: Docusaurus, VitePress, MkDocs (with plugins)
