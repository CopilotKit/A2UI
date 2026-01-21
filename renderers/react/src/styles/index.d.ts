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

/**
 * Default color palette CSS variables.
 * Defines all the color values (--n-*, --p-*, --s-*, --t-*, --nv-*, --e-*)
 * that the utility classes reference.
 */
export declare const defaultPalette: string;

/**
 * Structural CSS styles converted from Lit renderer.
 * Uses :root {} instead of :host {} for non-Shadow DOM usage.
 */
export declare const structuralStyles: string;

/**
 * Injects the A2UI structural styles into the document head.
 * Call this once at application startup when using litTheme.
 */
export declare function injectStyles(): void;

/**
 * Removes the injected A2UI structural styles from the document.
 */
export declare function removeStyles(): void;
