/**
 * Structural CSS styles converted from Lit renderer.
 * Uses .a2ui-surface {} instead of :host {} for non-Shadow DOM usage.
 */
export declare const structuralStyles: string;

/**
 * CSS overrides that fix React-specific issues.
 * Must come after structural styles to take precedence.
 */
export declare const styleOverrides: string;

/**
 * Injects A2UI structural styles into the document head.
 * Includes utility classes and React-specific overrides.
 * CSS variables (palette) must be defined by the host on :root.
 */
export declare function injectStyles(): void;

/**
 * Removes the injected A2UI structural styles from the document.
 */
export declare function removeStyles(): void;
