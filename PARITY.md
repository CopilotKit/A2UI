# Visual Parity: Lit and React Renderers

This document describes the approach used to achieve visual parity between the Lit (Shadow DOM) and React (Light DOM) renderers.

## Structural Mirroring

### The Challenge

Lit components use Shadow DOM, where each component has an encapsulated DOM tree with its own scoped styles. The typical structure is:

```
#shadow-root
  <section class="theme-classes">
    <slot></slot>    ← children projected here
  </section>
```

The shadow host element (the custom element itself) acts as the `:host` and can have its own styles.

React uses Light DOM where everything exists in the global DOM. To achieve parity, we mirror Lit's two-element structure.

### The Solution

Each React component renders a wrapper div (representing `:host`) plus a section (the internal element):

```tsx
// React component structure
<div className="a2ui-card">           {/* ← :host equivalent */}
  <section className="theme-classes"> {/* ← internal element */}
    {children}                        {/* ← ::slotted(*) equivalent */}
  </section>
</div>
```

This mirroring allows CSS selectors to target the same conceptual elements in both renderers.

## CSS Selector Transformation

### Shadow DOM to Light DOM

Lit's Shadow DOM selectors need transformation for React's global CSS:

| Lit (Shadow DOM)      | React (Light DOM)                        |
|-----------------------|------------------------------------------|
| `:host`               | `.a2ui-surface .a2ui-{component}`        |
| `section`             | `.a2ui-surface .a2ui-{component} section`|
| `::slotted(*)`        | `.a2ui-surface .a2ui-{component} section > *` |
| `element` (e.g., `h2`)| `:where(.a2ui-surface .a2ui-{component}) element` |

### Example: Card Component

Lit's card.ts static styles:
```css
:host {
  display: block;
  flex: var(--weight);
  min-height: 0;
  overflow: auto;
}

section {
  height: 100%;
  width: 100%;
  min-height: 0;
  overflow: auto;
}

section ::slotted(*) {
  height: 100%;
  width: 100%;
}
```

React's componentSpecificStyles equivalent:
```css
.a2ui-surface .a2ui-card {
  display: block;
  flex: var(--weight);
  min-height: 0;
  overflow: auto;
}

.a2ui-surface .a2ui-card section {
  height: 100%;
  width: 100%;
  min-height: 0;
  overflow: auto;
}

.a2ui-surface .a2ui-card section > * {
  height: 100%;
  width: 100%;
}
```

## CSS Specificity Matching

### The Problem

Shadow DOM provides natural style encapsulation with low specificity. A selector like `h2` inside Shadow DOM has specificity `(0,0,0,1)`.

In React's global CSS, we need contextual selectors to scope styles:
```css
.a2ui-surface .a2ui-text h2 { ... }
```

This has specificity `(0,0,2,1)` — much higher than Lit's `(0,0,0,1)`.

### Why It Matters

Utility classes like `.typography-w-500` have specificity `(0,0,1,0)`. In Lit:
- `h2 { font: inherit; }` = `(0,0,0,1)` — loses to utility class
- `.typography-w-500` = `(0,0,1,0)` — **wins**, font-weight: 500 applied

In React (without fix):
- `.a2ui-surface .a2ui-text h2 { font: inherit; }` = `(0,0,2,1)` — **wins**
- `.typography-w-500` = `(0,0,1,0)` — loses, font-weight reset to 400

### The Solution: `:where()`

The `:where()` pseudo-class has zero specificity contribution. Wrapping contextual selectors in `:where()` matches Lit's low specificity:

```css
/* Before: specificity (0,0,2,1) — too high */
.a2ui-surface .a2ui-text h1,
.a2ui-surface .a2ui-text h2 { ... }

/* After: specificity (0,0,0,1) — matches Lit */
:where(.a2ui-surface .a2ui-text) h1,
:where(.a2ui-surface .a2ui-text) h2 { ... }
```

Now utility classes can override element resets, just like in Lit.

### When to Use `:where()`

Use `:where()` when the Lit component has element selectors that should be overridable by utility classes:

- **Use `:where()`**: Element resets like `h1, h2 { font: inherit; }`
- **Don't use `:where()`**: Structural styles on `:host` or `section` that define component behavior

## File Organization

- **`src/styles/index.ts`**: Contains `structuralStyles` (from Lit) and `componentSpecificStyles` (React-specific)
- **Component files**: Render the mirrored structure with appropriate class names
- **`injectStyles()`**: Injects both structural and component-specific styles into the document

## Testing Parity

The `renderers/visual-parity` directory contains side-by-side comparisons:
1. Load the same fixture in both Lit and React
2. Compare rendered output visually and via computed styles
3. Use browser DevTools to verify CSS specificity matches
