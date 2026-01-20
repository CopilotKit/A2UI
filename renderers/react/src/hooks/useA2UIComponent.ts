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

import { useCallback, useId, useMemo } from 'react';
import type { Types, Primitives } from '@a2ui/lit/0.8';
import { useA2UIContext } from '../core/A2UIProvider';
import { useTheme } from '../theme/ThemeContext';

/**
 * Result returned by the useA2UIComponent hook.
 */
export interface UseA2UIComponentResult {
  /** The current theme */
  theme: Types.Theme;

  /** Resolve a StringValue to its actual string value */
  resolveString: (value: Primitives.StringValue | null | undefined) => string | null;

  /** Resolve a NumberValue to its actual number value */
  resolveNumber: (value: Primitives.NumberValue | null | undefined) => number | null;

  /** Resolve a BooleanValue to its actual boolean value */
  resolveBoolean: (value: Primitives.BooleanValue | null | undefined) => boolean | null;

  /** Set a value in the data model (for two-way binding) */
  setValue: (path: string, value: Types.DataValue) => void;

  /** Get a value from the data model */
  getValue: (path: string) => Types.DataValue | null;

  /** Dispatch a user action */
  sendAction: (action: Types.Action) => void;

  /** Generate a unique ID for accessibility */
  getUniqueId: (prefix: string) => string;
}

/**
 * Base hook for A2UI components. Provides data binding, theme access,
 * and action dispatching.
 *
 * @param node - The component node from the A2UI message processor
 * @param surfaceId - The surface ID this component belongs to
 * @returns Object with theme, data binding helpers, and action dispatcher
 *
 * @example
 * ```tsx
 * function TextField({ node, surfaceId }: A2UIComponentProps<Types.TextFieldNode>) {
 *   const { theme, resolveString, setValue } = useA2UIComponent(node, surfaceId);
 *
 *   const label = resolveString(node.properties.label);
 *   const value = resolveString(node.properties.text) ?? '';
 *
 *   return (
 *     <div className={classMapToString(theme.components.TextField.container)}>
 *       <label>{label}</label>
 *       <input
 *         value={value}
 *         onChange={(e) => setValue(node.properties.text?.path!, e.target.value)}
 *       />
 *     </div>
 *   );
 * }
 * ```
 */
export function useA2UIComponent<T extends Types.AnyComponentNode>(
  node: T,
  surfaceId: string
): UseA2UIComponentResult {
  const context = useA2UIContext();
  const theme = useTheme();
  const baseId = useId();

  /**
   * Resolve a StringValue to its actual string value.
   * Checks literalString, literal, then path in that order.
   */
  const resolveString = useCallback(
    (value: Primitives.StringValue | null | undefined): string | null => {
      if (!value) return null;
      if (typeof value !== 'object') return null;

      if (value.literalString !== undefined) {
        return value.literalString;
      }
      if (value.literal !== undefined) {
        return String(value.literal);
      }
      if (value.path) {
        const data = context.getData(node, value.path, surfaceId);
        return data !== null ? String(data) : null;
      }
      return null;
    },
    [context, node, surfaceId]
  );

  /**
   * Resolve a NumberValue to its actual number value.
   */
  const resolveNumber = useCallback(
    (value: Primitives.NumberValue | null | undefined): number | null => {
      if (!value) return null;
      if (typeof value !== 'object') return null;

      if (value.literalNumber !== undefined) {
        return value.literalNumber;
      }
      if (value.literal !== undefined) {
        return Number(value.literal);
      }
      if (value.path) {
        const data = context.getData(node, value.path, surfaceId);
        return data !== null ? Number(data) : null;
      }
      return null;
    },
    [context, node, surfaceId]
  );

  /**
   * Resolve a BooleanValue to its actual boolean value.
   */
  const resolveBoolean = useCallback(
    (value: Primitives.BooleanValue | null | undefined): boolean | null => {
      if (!value) return null;
      if (typeof value !== 'object') return null;

      if (value.literalBoolean !== undefined) {
        return value.literalBoolean;
      }
      if (value.literal !== undefined) {
        return Boolean(value.literal);
      }
      if (value.path) {
        const data = context.getData(node, value.path, surfaceId);
        return data !== null ? Boolean(data) : null;
      }
      return null;
    },
    [context, node, surfaceId]
  );

  /**
   * Set a value in the data model for two-way binding.
   */
  const setValue = useCallback(
    (path: string, value: Types.DataValue) => {
      context.setData(node, path, value, surfaceId);
    },
    [context, node, surfaceId]
  );

  /**
   * Get a value from the data model.
   */
  const getValue = useCallback(
    (path: string): Types.DataValue | null => {
      return context.getData(node, path, surfaceId);
    },
    [context, node, surfaceId]
  );

  /**
   * Dispatch a user action to the server.
   * Resolves all context bindings before dispatching.
   */
  const sendAction = useCallback(
    (action: Types.Action) => {
      const actionContext: Record<string, unknown> = {};

      if (action.context) {
        for (const item of action.context) {
          if (item.value.literalString !== undefined) {
            actionContext[item.key] = item.value.literalString;
          } else if (item.value.literalNumber !== undefined) {
            actionContext[item.key] = item.value.literalNumber;
          } else if (item.value.literalBoolean !== undefined) {
            actionContext[item.key] = item.value.literalBoolean;
          } else if (item.value.path) {
            const resolvedPath = context.resolvePath(item.value.path, node.dataContextPath);
            actionContext[item.key] = context.getData(node, resolvedPath, surfaceId);
          }
        }
      }

      context.dispatch({
        userAction: {
          name: action.name,
          sourceComponentId: node.id,
          surfaceId,
          timestamp: new Date().toISOString(),
          context: actionContext,
        },
      });
    },
    [context, node, surfaceId]
  );

  /**
   * Generate a unique ID for accessibility purposes.
   * Uses React's useId() for SSR and Concurrent Mode compatibility.
   */
  const getUniqueId = useCallback(
    (prefix: string) => {
      return `${prefix}${baseId}`;
    },
    [baseId]
  );

  return useMemo(
    () => ({
      theme,
      resolveString,
      resolveNumber,
      resolveBoolean,
      setValue,
      getValue,
      sendAction,
      getUniqueId,
    }),
    [theme, resolveString, resolveNumber, resolveBoolean, setValue, getValue, sendAction, getUniqueId]
  );
}
