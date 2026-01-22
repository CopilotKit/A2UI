/*
 Copyright 2025 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import { Styles } from '@a2ui/lit/0.8';

/**
 * Default color palette CSS variables.
 * These define the actual color values that the utility classes reference.
 * Scoped to .a2ui-surface to avoid affecting the rest of the page.
 */
export const defaultPalette: string = `
.a2ui-surface {
  /* Neutral palette */
  --n-100: #ffffff;
  --n-99: #fcfcfc;
  --n-98: #f9f9f9;
  --n-95: #f1f1f1;
  --n-90: #e2e2e2;
  --n-80: #c6c6c6;
  --n-70: #ababab;
  --n-60: #919191;
  --n-50: #777777;
  --n-40: #5e5e5e;
  --n-35: #525252;
  --n-30: #474747;
  --n-25: #3b3b3b;
  --n-20: #303030;
  --n-15: #262626;
  --n-10: #1b1b1b;
  --n-5: #111111;
  --n-0: #000000;

  /* Primary palette */
  --p-100: #ffffff;
  --p-99: #fffbff;
  --p-98: #fcf8ff;
  --p-95: #f2efff;
  --p-90: #e1e0ff;
  --p-80: #c0c1ff;
  --p-70: #a0a3ff;
  --p-60: #8487ea;
  --p-50: #6a6dcd;
  --p-40: #5154b3;
  --p-35: #4447a6;
  --p-30: #383b99;
  --p-25: #2c2e8d;
  --p-20: #202182;
  --p-15: #131178;
  --p-10: #06006c;
  --p-5: #03004d;
  --p-0: #000000;

  /* Secondary palette */
  --s-100: #ffffff;
  --s-99: #fffbff;
  --s-98: #fcf8ff;
  --s-95: #f2efff;
  --s-90: #e2e0f9;
  --s-80: #c6c4dd;
  --s-70: #aaa9c1;
  --s-60: #8f8fa5;
  --s-50: #75758b;
  --s-40: #5d5c72;
  --s-35: #515165;
  --s-30: #454559;
  --s-25: #393a4d;
  --s-20: #2e2f42;
  --s-15: #242437;
  --s-10: #191a2c;
  --s-5: #0f0f21;
  --s-0: #000000;

  /* Tertiary palette */
  --t-100: #ffffff;
  --t-99: #fffbff;
  --t-98: #fff8f9;
  --t-95: #ffecf4;
  --t-90: #ffd8ec;
  --t-80: #e9b9d3;
  --t-70: #cc9eb8;
  --t-60: #af849d;
  --t-50: #946b83;
  --t-40: #79526a;
  --t-35: #6b465d;
  --t-30: #5d3b50;
  --t-25: #4f3044;
  --t-20: #412538;
  --t-15: #341a2d;
  --t-10: #270f22;
  --t-5: #1a0517;
  --t-0: #000000;

  /* Neutral variant palette */
  --nv-100: #ffffff;
  --nv-99: #fdfbff;
  --nv-98: #faf8ff;
  --nv-95: #f1effa;
  --nv-90: #e3e1ec;
  --nv-80: #c7c5d0;
  --nv-70: #abaab4;
  --nv-60: #919099;
  --nv-50: #77767f;
  --nv-40: #5e5d66;
  --nv-35: #52525a;
  --nv-30: #46464e;
  --nv-25: #3b3b43;
  --nv-20: #303038;
  --nv-15: #26252d;
  --nv-10: #1b1b23;
  --nv-5: #111118;
  --nv-0: #000000;

  /* Error palette */
  --e-100: #ffffff;
  --e-99: #fffbff;
  --e-98: #fff8f7;
  --e-95: #ffedea;
  --e-90: #ffdad6;
  --e-80: #ffb4ab;
  --e-70: #ff897d;
  --e-60: #ff5449;
  --e-50: #de3730;
  --e-40: #ba1a1a;
  --e-35: #a80e0e;
  --e-30: #930006;
  --e-25: #7e0003;
  --e-20: #690001;
  --e-15: #540001;
  --e-10: #410001;
  --e-5: #2d0001;
  --e-0: #000000;

  /* Font family - matches Lit's default-font-family for visual parity */
  --font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-family-flex: "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-family-mono: "Courier New", Courier, monospace;

  /* Color scheme for light-dark() function - default to light mode */
  --color-scheme: light;
  color-scheme: light;
}

`;

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
 * CSS overrides that must come AFTER structural styles to take precedence.
 * These fix React-specific issues and allow CSS variable customization.
 * All rules scoped to .a2ui-surface to avoid affecting the rest of the page.
 */
export const styleOverrides: string = `
/* Button text color override - ensure button text is white regardless of inner element colors */
.a2ui-surface button.color-c-p100 p,
.a2ui-surface button.color-c-p100 section,
.a2ui-surface button.color-c-p100 span,
.a2ui-surface button.color-c-p100 * {
  color: inherit !important;
}

/* Allow card background to be overridden via CSS variable --a2ui-card-bg */
.a2ui-surface .color-bgc-n100 {
  background-color: var(--a2ui-card-bg, light-dark(var(--n-100), var(--n-0))) !important;
}

/* Ensure markdown paragraph margins are reset (matches Lit structural styles) */
.a2ui-surface section p {
  margin: 0;
}

/* Match Lit Card's ::slotted(*) rule - direct children get full size */
.a2ui-surface .a2ui-card > div {
  height: 100%;
  width: 100%;
}

/* Match Lit Divider's Shadow DOM hr styling */
/* This ensures consistent rendering regardless of page-level CSS resets */
/* Note: background color is set by theme class (color-bgc-*), not here */
.a2ui-surface hr {
  height: 1px;
  border: none;
  margin: 8px 0;
}
`;

/**
 * Injects A2UI styles into the document head.
 * Includes both the color palette CSS variables and the structural utility classes.
 * Call this once at application startup.
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
  // Include palette (CSS variables), structural (utility classes), and overrides
  styleElement.textContent = defaultPalette + '\n' + structuralStyles + '\n' + styleOverrides;
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
