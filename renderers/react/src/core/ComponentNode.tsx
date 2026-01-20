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

import { Suspense, useMemo, memo } from 'react';
import type { Types } from '@a2ui/lit/0.8';
import { ComponentRegistry } from '../registry/ComponentRegistry';

/** Memoized loading fallback to avoid recreating on each render */
const LoadingFallback = memo(function LoadingFallback() {
  return (
    <div className="a2ui-loading" style={{ padding: '8px', opacity: 0.5 }}>
      Loading...
    </div>
  );
});

interface ComponentNodeProps {
  /** The component node to render (can be null/undefined for safety) */
  node: Types.AnyComponentNode | null | undefined;
  /** The surface ID this component belongs to */
  surfaceId: string;
  /** Optional custom registry. Falls back to singleton. */
  registry?: ComponentRegistry;
}

/**
 * ComponentNode - dynamically renders an A2UI component based on its type.
 *
 * Looks up the component in the registry and renders it with the appropriate props.
 * Supports lazy-loaded components via React.Suspense.
 *
 * Memoized to prevent unnecessary re-renders when parent updates but node hasn't changed.
 */
export const ComponentNode = memo(function ComponentNode({
  node,
  surfaceId,
  registry,
}: ComponentNodeProps) {
  // Handle null/undefined/invalid nodes gracefully
  if (!node || typeof node !== 'object' || !('type' in node)) {
    if (node) {
      console.warn('[A2UI] Invalid component node (not resolved?):', node);
    }
    return null;
  }

  const actualRegistry = registry ?? ComponentRegistry.getInstance();

  const Component = useMemo(
    () => actualRegistry.get(node.type),
    [actualRegistry, node.type]
  );

  // Memoize weight style to prevent object recreation
  const weightStyle = useMemo<React.CSSProperties | undefined>(() => {
    const weight = node.weight;
    return typeof weight === 'number'
      ? { display: 'flex', flex: weight, minHeight: 0 }
      : undefined;
  }, [node.weight]);

  if (!Component) {
    console.warn(`[A2UI] Unknown component type: ${node.type}`);
    return <UnknownComponent type={node.type} />;
  }

  // If no weight, render without wrapper for cleaner DOM
  if (!weightStyle) {
    return (
      <Suspense fallback={<LoadingFallback />}>
        <Component node={node} surfaceId={surfaceId} />
      </Suspense>
    );
  }

  return (
    <div style={weightStyle}>
      <Suspense fallback={<LoadingFallback />}>
        <Component node={node} surfaceId={surfaceId} />
      </Suspense>
    </div>
  );
});

/** Memoized unknown component fallback */
const UnknownComponent = memo(function UnknownComponent({ type }: { type: string }) {
  return (
    <div
      className="a2ui-unknown-component"
      style={{
        padding: '8px',
        backgroundColor: '#fee',
        color: '#c00',
        borderRadius: '4px',
        fontSize: '12px',
      }}
    >
      Unknown component: {type}
    </div>
  );
});

export default ComponentNode;
