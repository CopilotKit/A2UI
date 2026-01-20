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

import type { Types } from '@a2ui/lit/0.8';
import type { OnActionCallback } from '../types';

/**
 * The shape of the A2UI context value.
 */
export interface A2UIContextValue {
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
