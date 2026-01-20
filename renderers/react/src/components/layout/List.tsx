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
import { cn, classMapToString, stylesToObject } from '../../lib/utils';
import { ComponentNode } from '../../core/ComponentNode';

type Direction = 'vertical' | 'horizontal';
type Alignment = 'start' | 'center' | 'end' | 'stretch';

const alignmentMap: Record<Alignment, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

/**
 * List component - renders a scrollable list of items.
 *
 * Supports direction (vertical/horizontal) and alignment properties.
 */
export const List = memo(function List({ node, surfaceId }: A2UIComponentProps<Types.ListNode>) {
  const { theme } = useA2UIComponent(node, surfaceId);
  const props = node.properties;

  const direction = (props.direction as Direction) ?? 'vertical';
  const alignment = props.alignment as Alignment | undefined;

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'horizontal' ? 'row' : 'column',
    overflow: 'auto',
    ...(alignment && { alignItems: alignmentMap[alignment] }),
    ...stylesToObject(theme.additionalStyles?.List),
  };

  const children = Array.isArray(props.children) ? props.children : [];

  return (
    <section
      className={cn(
        classMapToString(theme.components.List),
        `a2ui-list--${direction}`,
        alignment && `a2ui-list--align-${alignment}`
      )}
      style={style}
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
});

export default List;
