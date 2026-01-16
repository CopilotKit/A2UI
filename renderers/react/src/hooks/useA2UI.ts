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

import { useCallback } from 'react';
import type { Types } from '@a2ui/lit/0.8';
import { useA2UIStore, useA2UIStoreSelector } from '../core/A2UIProvider';

/**
 * Result returned by the useA2UI hook.
 */
export interface UseA2UIResult {
  /** Process incoming server messages */
  processMessages: (messages: Types.ServerToClientMessage[]) => void;

  /** Get a surface by ID */
  getSurface: (surfaceId: string) => Types.Surface | undefined;

  /** Get all surfaces */
  getSurfaces: () => ReadonlyMap<string, Types.Surface>;

  /** Clear all surfaces */
  clearSurfaces: () => void;

  /** The current version number (increments on state changes) */
  version: number;
}

/**
 * Main API hook for A2UI. Provides methods to process messages
 * and access surface state.
 *
 * @returns Object with message processing and surface access methods
 *
 * @example
 * ```tsx
 * function ChatApp() {
 *   const { processMessages, getSurface } = useA2UI();
 *
 *   useEffect(() => {
 *     const ws = new WebSocket('wss://agent.example.com');
 *     ws.onmessage = (event) => {
 *       const messages = JSON.parse(event.data);
 *       processMessages(messages);
 *     };
 *     return () => ws.close();
 *   }, [processMessages]);
 *
 *   return <A2UIRenderer surfaceId="main" />;
 * }
 * ```
 */
export function useA2UI(): UseA2UIResult {
  const store = useA2UIStore();

  // Subscribe to version for reactivity
  const version = useA2UIStoreSelector((state) => state.version);

  const processMessages = useCallback(
    (messages: Types.ServerToClientMessage[]) => {
      store.getState().processMessages(messages);
    },
    [store]
  );

  const getSurface = useCallback(
    (surfaceId: string) => {
      return store.getState().getSurface(surfaceId);
    },
    [store]
  );

  const getSurfaces = useCallback(() => {
    return store.getState().getSurfaces();
  }, [store]);

  const clearSurfaces = useCallback(() => {
    store.getState().clearSurfaces();
  }, [store]);

  return {
    processMessages,
    getSurface,
    getSurfaces,
    clearSurfaces,
    version,
  };
}
