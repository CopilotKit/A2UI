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
 * Optional CSS styles for A2UI React components.
 *
 * To use the built-in styles, import this file in your app:
 *
 * @example
 * ```tsx
 * import '@a2ui/react/styles/structural.css';
 * ```
 *
 * Or use the style helper:
 * ```tsx
 * import { injectStyles } from '@a2ui/react/styles';
 * injectStyles();
 * ```
 */

// This file can be used to dynamically inject styles if needed
export function injectStyles(): void {
  // In a real implementation, this would inject the CSS
  console.warn(
    '[A2UI] For styles, import the CSS file directly: import "@a2ui/react/styles/structural.css"'
  );
}
