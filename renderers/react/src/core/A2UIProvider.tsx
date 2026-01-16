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
  useEffect,
  type ReactNode,
} from 'react';
import type { Types } from '@a2ui/lit/0.8';
import { createA2UIStore, type A2UIStoreApi } from './store';
import { ThemeProvider } from '../theme/ThemeContext';
import type { OnActionCallback } from '../types';

/**
 * Context for the A2UI store.
 */
const A2UIStoreContext = createContext<A2UIStoreApi | null>(null);

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
 * - Creates and manages the A2UI Zustand store
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
  // Create store only once using ref
  const storeRef = useRef<A2UIStoreApi | null>(null);

  if (!storeRef.current) {
    storeRef.current = createA2UIStore(onAction);
  }

  // Update onAction callback when it changes
  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.getState().setOnAction(onAction ?? null);
    }
  }, [onAction]);

  return (
    <A2UIStoreContext.Provider value={storeRef.current}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </A2UIStoreContext.Provider>
  );
}

/**
 * Hook to access the A2UI store.
 *
 * @returns The A2UI store API
 * @throws If used outside of an A2UIProvider
 */
export function useA2UIStore(): A2UIStoreApi {
  const store = useContext(A2UIStoreContext);
  if (!store) {
    throw new Error('useA2UIStore must be used within an A2UIProvider');
  }
  return store;
}

/**
 * Hook to access the A2UI store state with a selector.
 * This provides fine-grained reactivity - the component only re-renders
 * when the selected value changes.
 *
 * @param selector - Function to select a slice of state
 * @returns The selected state
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const version = useA2UIStoreSelector((state) => state.version);
 *   // Component only re-renders when version changes
 * }
 * ```
 */
export function useA2UIStoreSelector<T>(selector: (state: ReturnType<A2UIStoreApi['getState']>) => T): T {
  const store = useA2UIStore();
  return store(selector);
}
