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
 * Structural CSS styles from the Lit renderer, converted for global DOM use.
 * These styles define all the utility classes (layout-*, typography-*, color-*, etc.)
 * Converts :host selectors to :root for use outside Shadow DOM.
 */
export const structuralStyles: string = Styles.structuralStyles.replace(
  /:host\s*\{/g,
  ':root {'
);

/**
 * Injects A2UI structural styles into the document head.
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
  styleElement.textContent = structuralStyles;
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
