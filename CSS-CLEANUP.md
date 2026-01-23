# React Renderer CSS Cleanup Plan

## Problem Statement

The React renderer currently uses a mix of:
- Regex-transformed Lit utility classes
- Manual `styleOverrides` to replicate Lit Shadow DOM styles
- Hardcoded inline styles for structural layout (Card, Column, Row, List, Image)
- Inline styles for dynamic values that could be CSS attribute selectors

This is inconsistent with Lit's clean separation:
- **Structural CSS** → `static styles` (Shadow DOM scoped)
- **Theme classes** → `classMap(theme.components.X)`
- **User overrides** → `styleMap(theme.additionalStyles?.X)` (only if defined)
- **Dynamic CSS variables** → inline `styleMap` for values from props/data

## Goal

Align React with Lit's architecture:
1. All structural styles in CSS (no inline styles for layout)
2. Data attributes for prop-driven variations (alignment, distribution, direction)
3. Inline styles ONLY for:
   - User `additionalStyles`
   - Dynamic CSS variables (`--object-fit`, palette colors from surface data)

---

## Phase 1: Export Component CSS from Lit

### Option A: Lit exports combined component CSS (Recommended)

In `@a2ui/lit`, add an export that combines all component `static styles` into a single CSS string:

```typescript
// renderers/lit/src/0.8/styles/components.ts
import { Card } from '../ui/card.js';
import { Column } from '../ui/column.js';
import { Row } from '../ui/row.js';
import { List } from '../ui/list.js';
import { Image } from '../ui/image.js';
// ... etc

export const componentStyles: string = [
  Card.styles,
  Column.styles,
  Row.styles,
  List.styles,
  // ... etc
].map(styles => styles.map(s => s.cssText).join('\n')).join('\n');
```

Export from index:
```typescript
export { componentStyles } from './styles/components.js';
```

### Option B: Build-time extraction

Use a build script to extract CSS from Lit components and generate a `.css` file that React imports.

### Option C: Manual extraction (simplest, less maintainable)

Copy the `static styles` CSS from each Lit component into a dedicated React CSS file. Requires manual sync when Lit changes.

**Recommendation**: Option A - keeps single source of truth in Lit.

---

## Phase 2: CSS Transformation Layer

Create a transform function (or build-time script) that converts Lit CSS to React CSS:

### Transformations needed:

| Lit Selector | React Selector | Notes |
|--------------|----------------|-------|
| `:host` | `.a2ui-{component}` | Base component styles |
| `:host([attr="val"])` | `.a2ui-{component}[data-attr="val"]` | Attribute-driven variants |
| `::slotted(*)` | `> *` | Direct children |
| `::slotted(element)` | `> element` | Specific child elements |

### Transform function:

```typescript
// renderers/react/src/styles/transform.ts

interface TransformOptions {
  componentName: string;  // e.g., "column", "card"
}

export function transformLitCSS(css: string, options: TransformOptions): string {
  const { componentName } = options;
  const className = `a2ui-${componentName}`;

  return css
    // :host([attr="val"]) → .a2ui-component[data-attr="val"]
    .replace(/:host\(\[([^\]]+)\]\)/g, `.${className}[data-$1]`)
    // :host → .a2ui-component
    .replace(/:host/g, `.${className}`)
    // ::slotted(*) → > *
    .replace(/::slotted\(\*\)/g, '> *')
    // ::slotted(element) → > element
    .replace(/::slotted\(([^)]+)\)/g, '> $1');
}
```

### Alternative: No runtime transform

If Lit exports pre-transformed CSS (Option A modified), the transform can happen at Lit build time, eliminating runtime regex entirely.

```typescript
// In Lit's build/export
export function getReactCSS(componentName: string, litCSS: string): string {
  // Transform at export time
}
```

---

## Phase 3: Update React Components

### 3.1 Add wrapper classes and data attributes

Each component needs:
1. A stable wrapper class (e.g., `a2ui-column`)
2. Data attributes for dynamic variations

**Column.tsx**:
```tsx
export const Column = memo(function Column({ node, surfaceId }: A2UIComponentProps<Types.ColumnNode>) {
  const { theme } = useA2UIComponent(node, surfaceId);
  const props = node.properties;

  const distribution = props.distribution as Distribution | undefined;
  const alignment = props.alignment as Alignment | undefined;

  const children = Array.isArray(props.children) ? props.children : [];

  return (
    <section
      className={`a2ui-column ${classMapToString(theme.components.Column)}`}
      data-alignment={alignment ?? 'stretch'}
      data-distribution={distribution ?? 'start'}
      style={stylesToObject(theme.additionalStyles?.Column)}  // ONLY user overrides
    >
      {children.map((child, index) => (
        <ComponentNode key={...} node={...} surfaceId={surfaceId} />
      ))}
    </section>
  );
});
```

**Row.tsx**: Same pattern with `a2ui-row`, `data-alignment`, `data-distribution`

**List.tsx**: Same pattern with `a2ui-list`, `data-direction`, `data-alignment`

**Card.tsx**:
```tsx
return (
  <section
    className={`a2ui-card ${classMapToString(theme.components.Card)}`}
    style={stylesToObject(theme.additionalStyles?.Card)}  // ONLY user overrides
  >
    {children.map(...)}
  </section>
);
```

**Image.tsx** (keeps dynamic CSS variable):
```tsx
return (
  <section
    className={`a2ui-image ${classMapToString(classes)}`}
    data-usage-hint={usageHint}
    style={{
      ...stylesToObject(theme.additionalStyles?.Image),
      '--object-fit': fit ?? 'fill',  // Dynamic CSS variable - legitimate inline style
    } as React.CSSProperties}
  >
    <img src={url} alt="" />
  </section>
);
```

### 3.2 Components requiring updates

| Component | Wrapper Class | Data Attributes | Inline Styles (legitimate) |
|-----------|---------------|-----------------|---------------------------|
| Card | `a2ui-card` | - | `additionalStyles` only |
| Column | `a2ui-column` | `data-alignment`, `data-distribution` | `additionalStyles` only |
| Row | `a2ui-row` | `data-alignment`, `data-distribution` | `additionalStyles` only |
| List | `a2ui-list` | `data-direction`, `data-alignment` | `additionalStyles` only |
| Image | `a2ui-image` | `data-usage-hint` | `additionalStyles` + `--object-fit` |
| Tabs | `a2ui-tabs` | - | `additionalStyles` only |
| Modal | `a2ui-modal` | - | `additionalStyles` only |
| Text | `a2ui-text` | `data-usage-hint` | `additionalStyles` only |
| Button | `a2ui-button` | - | `additionalStyles` only |
| TextField | `a2ui-textfield` | `data-type` | `additionalStyles` only |
| CheckBox | `a2ui-checkbox` | - | `additionalStyles` only |
| Slider | `a2ui-slider` | - | `additionalStyles` only |
| DateTimeInput | `a2ui-datetimeinput` | - | `additionalStyles` only |
| MultipleChoice | `a2ui-multiplechoice` | - | `additionalStyles` only |
| Divider | `a2ui-divider` | - | `additionalStyles` only |
| Icon | `a2ui-icon` | - | `additionalStyles` only |
| Video | `a2ui-video` | - | `additionalStyles` only |
| AudioPlayer | `a2ui-audioplayer` | - | `additionalStyles` only |

---

## Phase 4: Consolidated CSS Structure

### New file: `renderers/react/src/styles/components.css`

This file contains all component structural CSS, either:
- Imported and transformed from Lit
- Or manually maintained (less ideal)

```css
/* ==========================================================================
 * Column
 * ========================================================================== */

.a2ui-column {
  display: flex;
  flex: var(--weight);
}

.a2ui-column > section {
  display: flex;
  flex-direction: column;
  min-width: 100%;
  height: 100%;
}

.a2ui-column[data-alignment="start"] > section { align-items: flex-start; }
.a2ui-column[data-alignment="center"] > section { align-items: center; }
.a2ui-column[data-alignment="end"] > section { align-items: flex-end; }
.a2ui-column[data-alignment="stretch"] > section { align-items: stretch; }

.a2ui-column[data-distribution="start"] > section { justify-content: flex-start; }
.a2ui-column[data-distribution="center"] > section { justify-content: center; }
.a2ui-column[data-distribution="end"] > section { justify-content: flex-end; }
.a2ui-column[data-distribution="spaceBetween"] > section { justify-content: space-between; }
.a2ui-column[data-distribution="spaceAround"] > section { justify-content: space-around; }
.a2ui-column[data-distribution="spaceEvenly"] > section { justify-content: space-evenly; }

/* ==========================================================================
 * Row
 * ========================================================================== */

.a2ui-row {
  display: flex;
  flex: var(--weight);
}

.a2ui-row > section {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 100%;
}

/* ... alignment/distribution same pattern as Column ... */

/* ==========================================================================
 * Card
 * ========================================================================== */

.a2ui-card {
  display: block;
  flex: var(--weight);
  min-height: 0;
  overflow: auto;
}

.a2ui-card > section {
  height: 100%;
  width: 100%;
  min-height: 0;
  overflow: auto;
}

.a2ui-card > section > * {
  height: 100%;
  width: 100%;
}

/* ==========================================================================
 * List
 * ========================================================================== */

.a2ui-list {
  display: block;
  flex: var(--weight);
  min-height: 0;
  overflow: auto;
}

.a2ui-list[data-direction="vertical"] > section {
  display: grid;
}

.a2ui-list[data-direction="horizontal"] > section {
  display: flex;
  max-width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: none;
}

.a2ui-list[data-direction="horizontal"] > section > * {
  flex: 1 0 fit-content;
  max-width: min(80%, 400px);
}

/* ==========================================================================
 * Image
 * ========================================================================== */

.a2ui-image {
  display: block;
  flex: var(--weight);
  min-height: 0;
  overflow: auto;
}

.a2ui-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: var(--object-fit, fill);
}

/* ... etc for all components ... */
```

---

## Phase 5: Clean Up `styles/index.ts`

### Before (current):
```typescript
export const structuralStyles: string = Styles.structuralStyles.replace(
  /:host\s*\{/g,
  '.a2ui-surface {'
);

export const styleOverrides: string = `
/* ... 200+ lines of manual overrides ... */
`;
```

### After:
```typescript
import { Styles } from '@a2ui/lit/0.8';
import componentCSS from './components.css?raw';  // or however you import

// Utility classes (layout-*, typography-*, color-*, etc.)
export const utilityStyles: string = Styles.structuralStyles.replace(
  /:host\s*\{/g,
  '.a2ui-surface {'
);

// Component structural styles (from Lit, transformed)
export const componentStyles: string = componentCSS;

// Minimal overrides (should be nearly empty after cleanup)
export const styleOverrides: string = `
/* Global box-sizing */
.a2ui-surface *,
.a2ui-surface *::before,
.a2ui-surface *::after {
  box-sizing: border-box;
}
`;

export function injectStyles(): void {
  // ...
  styleElement.textContent = [
    defaultPalette,
    utilityStyles,
    componentStyles,
    styleOverrides,
  ].join('\n');
  // ...
}
```

---

## Phase 6: Remove Inline Styles from Components

After CSS is in place, remove all hardcoded inline styles from:

- [ ] `Card.tsx` - remove `height`, `width`, `minHeight`, `overflow`
- [ ] `Column.tsx` - remove `display`, `flexDirection`, `minWidth`, `height`, `justifyContent`, `alignItems`
- [ ] `Row.tsx` - remove `display`, `flexDirection`, `width`, `minHeight`, `justifyContent`, `alignItems`
- [ ] `List.tsx` - remove `display`, `maxWidth`, `overflowX`, `overflowY`, `scrollbarWidth`, `alignItems`
- [ ] `Image.tsx` - keep only `--object-fit` CSS variable (legitimate dynamic value)

---

## Summary: What Changes

| File | Change |
|------|--------|
| `@a2ui/lit` | Export component CSS (or React extracts it) |
| `styles/index.ts` | Import component CSS, remove most `styleOverrides` |
| `styles/components.css` | New file with all component structural CSS |
| `Card.tsx` | Add `a2ui-card` class, remove inline styles |
| `Column.tsx` | Add `a2ui-column` class + data attrs, remove inline styles |
| `Row.tsx` | Add `a2ui-row` class + data attrs, remove inline styles |
| `List.tsx` | Add `a2ui-list` class + data attrs, remove inline styles |
| `Image.tsx` | Add `a2ui-image` class + data attr, keep only `--object-fit` |
| Other components | Add `a2ui-*` classes, verify no unnecessary inline styles |

---

## Validation

1. **Visual parity tests** - Run existing visual comparison tests (React vs Lit)
2. **Manual QA** - Check demo gallery for regressions
3. **Inspect elements** - Verify no inline styles except legitimate cases

---

## Benefits

1. **Single source of truth** - CSS comes from Lit (or mirrors it exactly)
2. **No inline style hacks** - Structural layout is CSS, not JS
3. **Easier theming** - Users can override via CSS, not just `additionalStyles`
4. **Better DevTools experience** - Styles visible in CSS panel, not computed from inline
5. **Smaller JS bundle** - CSS extracted, not embedded in component code
6. **Maintainability** - Clear separation of concerns
