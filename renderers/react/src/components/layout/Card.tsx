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
import type { A2UIComponentProps } from '../../types';
import { useA2UIComponent } from '../../hooks/useA2UIComponent';
import { classMapToString, stylesToObject } from '../../lib/utils';
import { ComponentNode } from '../../core/ComponentNode';

/**
 * Card component - a container that visually groups content.
 *
 * Renders either a single child or multiple children.
 */
export function Card({ node, surfaceId }: A2UIComponentProps<Types.CardNode>) {
  const { theme } = useA2UIComponent(node, surfaceId);
  const props = node.properties;

  // Card can have either a single child or multiple children
  const rawChildren = props.children ?? (props.child ? [props.child] : []);
  const children = Array.isArray(rawChildren) ? rawChildren : [];

  // Use CSS variable for background, defaulting to white
  const cardStyle = {
    ...stylesToObject(theme.additionalStyles?.Card),
    backgroundColor: 'var(--a2ui-card-bg, white)',
  };

  return (
    <section
      className={classMapToString(theme.components.Card)}
      style={cardStyle}
    >
      {children.map((child, index) => {
        const childId = typeof child === 'object' && child !== null && 'id' in child
          ? (child as Types.AnyComponentNode).id
          : `child-${index}`;
        const childNode = typeof child === 'object' && child !== null && 'type' in child
          ? (child as Types.AnyComponentNode)
          : null;
        return <ComponentNode key={childId} node={childNode} surfaceId={surfaceId} />;
      })}
    </section>
  );
}

export default Card;
