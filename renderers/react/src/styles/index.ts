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
.a2ui-surface .a2ui-card section {
  height: 100%;
  width: 100%;
  min-height: 0;
  overflow: auto;
}

/* section ::slotted(*) { height: 100%; width: 100%; } */
.a2ui-surface .a2ui-card section > * {
  height: 100%;
  width: 100%;
}

/* =========================================================================
 * Divider (matches Lit divider.ts Shadow DOM styles)
 * ========================================================================= */

/* Match Lit Divider's Shadow DOM hr styling */
/* Lit has: hr { height: 1px; background: #ccc; border: none; } */
.a2ui-surface hr {
  height: 1px;
  background: #ccc;
  border: none;
  margin: 8px 0;
}

/* =========================================================================
 * Text (matches Lit text.ts Shadow DOM styles)
 * ========================================================================= */

/* Ensure markdown paragraph margins are reset (matches Lit structural styles) */
.a2ui-surface section p {
  margin: 0;
}

/* Match Lit Text's h1-h5 reset - prevents browser defaults from affecting text */
/* Lit has: h1, h2, h3, h4, h5 { line-height: inherit; font: inherit; } */
/* Note: Do NOT reset margin here - margins are controlled by theme classes (layout-mb-*) */
.a2ui-surface section h1,
.a2ui-surface section h2,
.a2ui-surface section h3,
.a2ui-surface section h4,
.a2ui-surface section h5 {
  line-height: inherit;
  font: inherit;
}

/* =========================================================================
 * TextField (matches Lit text-field.ts Shadow DOM styles)
 * ========================================================================= */

/* Match Lit TextField's input styling */
/* Lit has: input { display: block; width: 100%; } */
.a2ui-surface section input[type="text"],
.a2ui-surface section input[type="number"],
.a2ui-surface section input[type="date"] {
  display: block;
  width: 100%;
  box-sizing: border-box;
}

/* Match Lit TextField's label styling */
/* Lit has: label { display: block; margin-bottom: 4px; } */
.a2ui-surface section > label {
  display: block;
  margin-bottom: 4px;
}

/* Match Lit TextField's textarea styling */
.a2ui-surface section textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
}

/* =========================================================================
 * CheckBox (matches Lit checkbox.ts Shadow DOM styles)
 * ========================================================================= */

/* Match Lit CheckBox's input styling */
/* Lit has: input { display: block; width: 100%; } */
/* Note: checkbox input width: 100% is from Lit but may need adjustment */
.a2ui-surface section input[type="checkbox"] {
  box-sizing: border-box;
}

/* =========================================================================
 * Slider (matches Lit slider.ts Shadow DOM styles)
 * ========================================================================= */

/* Match Lit Slider's input styling */
/* Lit has: input { display: block; width: 100%; } */
.a2ui-surface section input[type="range"] {
  display: block;
  width: 100%;
  box-sizing: border-box;
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
