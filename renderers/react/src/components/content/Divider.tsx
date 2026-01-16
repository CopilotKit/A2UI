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
import { cn, classMapToString, stylesToObject } from '../../lib/utils';

type Axis = 'horizontal' | 'vertical';

/**
 * Divider component - renders a visual separator line.
 *
 * Supports axis values: horizontal (default), vertical
 */
export function Divider({ node, surfaceId }: A2UIComponentProps<Types.DividerNode>) {
  const { theme } = useA2UIComponent(node, surfaceId);
  const props = node.properties;

  const axis = (props.axis as Axis) ?? 'horizontal';

  return (
    <hr
      className={cn(
        classMapToString(theme.components.Divider),
        axis === 'vertical' && 'a2ui-divider--vertical'
      )}
      style={stylesToObject(theme.additionalStyles?.Divider)}
    />
  );
}

export default Divider;
