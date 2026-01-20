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

import { memo } from 'react';
import type { Types } from '@a2ui/lit/0.8';
import type { A2UIComponentProps } from '../../types';
import { useA2UIComponent } from '../../hooks/useA2UIComponent';
import { classMapToString, stylesToObject } from '../../lib/utils';

/**
 * Convert camelCase to snake_case for Material Symbols font.
 * e.g., "shoppingCart" -> "shopping_cart"
 * This matches the Lit renderer's approach.
 */
function toSnakeCase(str: string): string {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

/**
 * Check if the theme has a container/element structure
 */
function hasContainerStructure(
  iconTheme: unknown
): iconTheme is { container: Record<string, boolean>; element: Record<string, boolean> } {
  return (
    typeof iconTheme === 'object' &&
    iconTheme !== null &&
    'container' in iconTheme &&
    'element' in iconTheme
  );
}

/**
 * Icon component - renders an icon using Material Symbols Outlined font.
 *
 * This matches the Lit renderer's approach using the g-icon class with
 * Material Symbols Outlined font.
 *
 * @example Add Material Symbols font to your HTML:
 * ```html
 * <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">
 * ```
 */
export const Icon = memo(function Icon({ node, surfaceId }: A2UIComponentProps<Types.IconNode>) {
  const { theme, resolveString } = useA2UIComponent(node, surfaceId);
  const props = node.properties;

  const iconName = resolveString(props.name);

  if (!iconName) {
    return null;
  }

  // Convert camelCase to snake_case for Material Symbols
  const snakeCaseName = toSnakeCase(iconName);

  const iconTheme = theme.components.Icon;
  const hasStructure = hasContainerStructure(iconTheme);

  // Get classes based on theme structure
  const containerClasses = hasStructure
    ? classMapToString(iconTheme.container)
    : classMapToString(iconTheme as Record<string, boolean>);

  const elementClasses = hasStructure
    ? classMapToString(iconTheme.element)
    : '';

  if (hasStructure) {
    return (
      <div
        className={containerClasses}
        style={stylesToObject(theme.additionalStyles?.Icon)}
      >
        <span className={`g-icon ${elementClasses}`.trim()}>{snakeCaseName}</span>
      </div>
    );
  }

  return (
    <span
      className={`g-icon ${containerClasses}`.trim()}
      style={stylesToObject(theme.additionalStyles?.Icon)}
    >
      {snakeCaseName}
    </span>
  );
});

export default Icon;
