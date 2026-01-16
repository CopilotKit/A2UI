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

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { Data, Types } from '@a2ui/lit/0.8';
import type { OnActionCallback } from '../types';

/**
 * The shape of the A2UI Zustand store.
 */
export interface A2UIStore {
  /** The underlying message processor from @a2ui/lit */
  processor: Types.MessageProcessor;

  /** Version counter for triggering React re-renders */
  version: number;

  /** Callback for dispatching actions to the server */
  onAction: OnActionCallback | null;

  // ===== Actions =====

  /** Process incoming server messages */
  processMessages: (messages: Types.ServerToClientMessage[]) => void;

  /** Update data in the data model (for two-way binding) */
  setData: (
    node: Types.AnyComponentNode | null,
    path: string,
    value: Types.DataValue,
    surfaceId: string
  ) => void;

  /** Dispatch a user action to the server */
  dispatch: (message: Types.A2UIClientEventMessage) => void;

  /** Clear all surfaces */
  clearSurfaces: () => void;

  /** Set the action callback */
  setOnAction: (callback: OnActionCallback | null) => void;

  // ===== Selectors =====

  /** Get a surface by ID */
  getSurface: (surfaceId: string) => Types.Surface | undefined;

  /** Get all surfaces */
  getSurfaces: () => ReadonlyMap<string, Types.Surface>;

  /** Get data from the data model */
  getData: (
    node: Types.AnyComponentNode,
    path: string,
    surfaceId: string
  ) => Types.DataValue | null;

  /** Resolve a relative path to an absolute path */
  resolvePath: (path: string, dataContextPath?: string) => string;
}

/**
 * Creates a new A2UI store instance.
 *
 * @param onAction - Optional callback for handling user actions
 * @returns A Zustand store for A2UI state management
 */
export function createA2UIStore(onAction?: OnActionCallback) {
  return create<A2UIStore>()(
    subscribeWithSelector((set, get) => {
      // Create the signal-based message processor from @a2ui/lit
      const processor = Data.createSignalA2uiMessageProcessor();

      return {
        processor,
        version: 0,
        onAction: onAction ?? null,

        // ===== Actions =====

        processMessages: (messages) => {
          get().processor.processMessages(messages);
          // Increment version to trigger React re-renders
          set((state) => ({ version: state.version + 1 }));
        },

        setData: (node, path, value, surfaceId) => {
          get().processor.setData(node, path, value, surfaceId);
          // Increment version to trigger React re-renders
          set((state) => ({ version: state.version + 1 }));
        },

        dispatch: (message) => {
          const { onAction } = get();
          if (onAction) {
            onAction(message);
          }
        },

        clearSurfaces: () => {
          get().processor.clearSurfaces();
          set((state) => ({ version: state.version + 1 }));
        },

        setOnAction: (callback) => {
          set({ onAction: callback });
        },

        // ===== Selectors =====

        getSurface: (surfaceId) => {
          return get().processor.getSurfaces().get(surfaceId);
        },

        getSurfaces: () => {
          return get().processor.getSurfaces();
        },

        getData: (node, path, surfaceId) => {
          return get().processor.getData(node, path, surfaceId);
        },

        resolvePath: (path, dataContextPath) => {
          return get().processor.resolvePath(path, dataContextPath);
        },
      };
    })
  );
}

/**
 * Type for the store created by createA2UIStore.
 */
export type A2UIStoreApi = ReturnType<typeof createA2UIStore>;
