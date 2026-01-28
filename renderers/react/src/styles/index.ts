import { Styles } from '@a2ui/lit/0.8';

/**
 * Structural CSS styles from the Lit renderer, converted for global DOM use.
 * These styles define all the utility classes (layout-*, typography-*, color-*, etc.)
 * Converts :host selectors to .a2ui-surface for scoped use outside Shadow DOM.
 */
export const structuralStyles: string = Styles.structuralStyles.replace(
  /:host\s*\{/g,
  '.a2ui-surface {'
);

/**
 * Component-specific styles that replicate Lit's Shadow DOM scoped CSS.
 *
 * Each Lit component has `static styles` with :host, element selectors, and ::slotted().
 * Since React uses Light DOM, we transform these to global CSS scoped under .a2ui-surface.
 *
 * Transformation rules:
 *   :host          → .a2ui-surface .a2ui-{component}
 *   section        → .a2ui-surface .a2ui-{component} section
 *   ::slotted(*)   → .a2ui-surface .a2ui-{component} section > *
 */
export const componentSpecificStyles: string = `
/* =========================================================================
 * Card (from Lit card.ts static styles)
 * ========================================================================= */

/* :host { display: block; flex: var(--weight); min-height: 0; overflow: auto; } */
.a2ui-surface .a2ui-card {
  display: block;
  flex: var(--weight);
  min-height: 0;
  overflow: auto;
}

/* section { height: 100%; width: 100%; min-height: 0; overflow: auto; } */
/* Use > to target only Card's direct section, not nested sections (e.g., TextField's section) */
.a2ui-surface .a2ui-card > section {
  height: 100%;
  width: 100%;
  min-height: 0;
  overflow: auto;
}

/* section ::slotted(*) { height: 100%; width: 100%; } */
/* Use > section > to only target Card's slotted children, not deeply nested elements */
.a2ui-surface .a2ui-card > section > * {
  height: 100%;
  width: 100%;
}

/* =========================================================================
 * Divider (from Lit divider.ts static styles)
 * ========================================================================= */

/* :host { display: block; min-height: 0; overflow: auto; } */
.a2ui-surface .a2ui-divider {
  display: block;
  min-height: 0;
  overflow: auto;
}

/* hr { height: 1px; background: #ccc; border: none; } */
.a2ui-surface .a2ui-divider hr {
  height: 1px;
  background: #ccc;
  border: none;
}

/* =========================================================================
 * Text (from Lit text.ts static styles)
 * ========================================================================= */

/* :host { display: block; flex: var(--weight); } */
.a2ui-surface .a2ui-text {
  display: block;
  flex: var(--weight);
}

/* h1, h2, h3, h4, h5 { line-height: inherit; font: inherit; } */
/* Use :where() to match Lit's low specificity (0,0,0,1 - just element) */
:where(.a2ui-surface .a2ui-text) h1,
:where(.a2ui-surface .a2ui-text) h2,
:where(.a2ui-surface .a2ui-text) h3,
:where(.a2ui-surface .a2ui-text) h4,
:where(.a2ui-surface .a2ui-text) h5 {
  line-height: inherit;
  font: inherit;
}

/* Ensure markdown paragraph margins are reset */
.a2ui-surface .a2ui-text p {
  margin: 0;
}

/* =========================================================================
 * TextField (from Lit text-field.ts static styles)
 * ========================================================================= */

/* :host { display: flex; flex: var(--weight); } */
.a2ui-surface .a2ui-textfield {
  display: flex;
  flex: var(--weight);
}

/* input { display: block; width: 100%; } */
.a2ui-surface .a2ui-textfield input {
  display: block;
  width: 100%;
}

/* label { display: block; margin-bottom: 4px; } */
.a2ui-surface .a2ui-textfield label {
  display: block;
  margin-bottom: 4px;
}

/* textarea - same styling as input for multiline text fields */
.a2ui-surface .a2ui-textfield textarea {
  display: block;
  width: 100%;
}

/* =========================================================================
 * CheckBox (from Lit checkbox.ts static styles)
 * ========================================================================= */

/* :host { display: block; flex: var(--weight); min-height: 0; overflow: auto; } */
.a2ui-surface .a2ui-checkbox {
  display: block;
  flex: var(--weight);
  min-height: 0;
  overflow: auto;
}

/* input { display: block; width: 100%; } */
.a2ui-surface .a2ui-checkbox input {
  display: block;
  width: 100%;
}

/* =========================================================================
 * Slider (from Lit slider.ts static styles)
 * ========================================================================= */

/* :host { display: block; flex: var(--weight); } */
.a2ui-surface .a2ui-slider {
  display: block;
  flex: var(--weight);
}

/* input { display: block; width: 100%; } */
.a2ui-surface .a2ui-slider input {
  display: block;
  width: 100%;
}

/* =========================================================================
 * Global box-sizing (matches Lit's * { box-sizing: border-box; } in components)
 * ========================================================================= */

.a2ui-surface *,
.a2ui-surface *::before,
.a2ui-surface *::after {
  box-sizing: border-box;
}
`;

/**
 * Injects A2UI structural styles into the document head.
 * Includes utility classes (layout-*, typography-*, color-*, etc.) and React-specific overrides.
 * Call this once at application startup.
 *
 * NOTE: CSS variables (--n-*, --p-*, etc.) must be defined by the host application on :root,
 * just like in the Lit renderer. This allows full customization of the color palette.
 *
 * @example
 * ```tsx
 * import { injectStyles } from '@a2ui/react/styles';
 *
 * // In your app entry point:
 * injectStyles();
 * ```
 */
export function injectStyles(): void {
  if (typeof document === 'undefined') {
    return; // SSR safety
  }

  const styleId = 'a2ui-structural-styles';

  // Avoid duplicate injection
  if (document.getElementById(styleId)) {
    return;
  }

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  // Include structural (utility classes) and component-specific styles
  // Note: CSS variables (palette) must be defined by the host application on :root,
  // just like in the Lit renderer. This allows full customization.
  styleElement.textContent = structuralStyles + '\n' + componentSpecificStyles;
  document.head.appendChild(styleElement);
}

/**
 * Removes injected A2UI styles from the document.
 * Useful for cleanup in tests or when unmounting.
 */
export function removeStyles(): void {
  if (typeof document === 'undefined') {
    return;
  }

  const styleElement = document.getElementById('a2ui-structural-styles');
  if (styleElement) {
    styleElement.remove();
  }
}
