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

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { Data, Types } from '@a2ui/lit/0.8';
import type { A2UIContextValue } from './store';
import { ThemeProvider } from '../theme/ThemeContext';
import type { OnActionCallback } from '../types';

/**
 * Context for the A2UI state.
 */
const A2UIContext = createContext<A2UIContextValue | null>(null);

/**
 * Props for the A2UIProvider component.
 */
export interface A2UIProviderProps {
  /** Callback invoked when a user action is dispatched (button click, etc.) */
  onAction?: OnActionCallback;
  /** Theme configuration. Falls back to default theme if not provided. */
  theme?: Types.Theme;
  /** Child components */
  children: ReactNode;
}

/**
 * Provider component that sets up the A2UI context for descendant components.
 *
 * This provider:
 * - Creates and manages the A2UI message processor
 * - Provides the theme context
 * - Handles action callbacks
 *
 * @example
 * ```tsx
 * function App() {
 *   const handleAction = async (message) => {
 *     // Send action to server
 *     const response = await fetch('/api/a2ui', {
 *       method: 'POST',
 *       body: JSON.stringify(message)
 *     });
 *     const newMessages = await response.json();
 *     // Process response messages
 *   };
 *
 *   return (
 *     <A2UIProvider onAction={handleAction}>
 *       <A2UIRenderer surfaceId="main" />
 *     </A2UIProvider>
 *   );
 * }
 * ```
 */
export function A2UIProvider({ onAction, theme, children }: A2UIProviderProps) {
  // Create message processor only once using ref
  const processorRef = useRef<Types.MessageProcessor | null>(null);
  if (!processorRef.current) {
    processorRef.current = Data.createSignalA2uiMessageProcessor();
  }
  const processor = processorRef.current;

  // Version counter for triggering re-renders
  const [version, setVersion] = useState(0);

  // Store onAction in a ref so callbacks always have the latest value
  const onActionRef = useRef<OnActionCallback | null>(onAction ?? null);
  onActionRef.current = onAction ?? null;

  // ===== Actions =====

  const processMessages = useCallback(
    (messages: Types.ServerToClientMessage[]) => {
      processor.processMessages(messages);
      setVersion((v) => v + 1);
    },
    [processor]
  );

  const setData = useCallback(
    (
      node: Types.AnyComponentNode | null,
      path: string,
      value: Types.DataValue,
      surfaceId: string
    ) => {
      processor.setData(node, path, value, surfaceId);
      setVersion((v) => v + 1);
    },
    [processor]
  );

  const dispatch = useCallback((message: Types.A2UIClientEventMessage) => {
    if (onActionRef.current) {
      onActionRef.current(message);
    }
  }, []);

  const clearSurfaces = useCallback(() => {
    processor.clearSurfaces();
    setVersion((v) => v + 1);
  }, [processor]);

  // ===== Selectors =====

  const getSurface = useCallback(
    (surfaceId: string) => {
      return processor.getSurfaces().get(surfaceId);
    },
    [processor]
  );

  const getSurfaces = useCallback(() => {
    return processor.getSurfaces();
  }, [processor]);

  const getData = useCallback(
    (node: Types.AnyComponentNode, path: string, surfaceId: string) => {
      return processor.getData(node, path, surfaceId);
    },
    [processor]
  );

  const resolvePath = useCallback(
    (path: string, dataContextPath?: string) => {
      return processor.resolvePath(path, dataContextPath);
    },
    [processor]
  );

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<A2UIContextValue>(
    () => ({
      processor,
      version,
      onAction: onActionRef.current,
      processMessages,
      setData,
      dispatch,
      clearSurfaces,
      getSurface,
      getSurfaces,
      getData,
      resolvePath,
    }),
    [
      processor,
      version,
      processMessages,
      setData,
      dispatch,
      clearSurfaces,
      getSurface,
      getSurfaces,
      getData,
      resolvePath,
    ]
  );

  return (
    <A2UIContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </A2UIContext.Provider>
  );
}

/**
 * Hook to access the A2UI context.
 *
 * @returns The A2UI context value
 * @throws If used outside of an A2UIProvider
 */
export function useA2UIContext(): A2UIContextValue {
  const context = useContext(A2UIContext);
  if (!context) {
    throw new Error('useA2UIContext must be used within an A2UIProvider');
  }
  return context;
}

/**
 * @deprecated Use useA2UIContext instead. This alias exists for backward compatibility only.
 */
export const useA2UIStore = useA2UIContext;

/**
 * @deprecated This selector pattern does not provide performance benefits with React Context.
 * Components will re-render on any context change regardless of what you select.
 * Use useA2UIContext() or useA2UI() directly instead.
 *
 * @param selector - Function to select a slice of state
 * @returns The selected state
 */
export function useA2UIStoreSelector<T>(selector: (state: A2UIContextValue) => T): T {
  const context = useA2UIContext();
  return selector(context);
}
