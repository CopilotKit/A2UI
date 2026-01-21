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

import { useCallback, memo } from 'react';
import type { Types } from '@a2ui/lit/0.8';
import type { A2UIComponentProps } from '../../types';
import { useA2UIComponent } from '../../hooks/useA2UIComponent';
import { classMapToString, stylesToObject } from '../../lib/utils';
import { ComponentNode } from '../../core/ComponentNode';

/**
 * Button component - a clickable element that triggers an action.
 *
 * Contains a child component (usually Text or Icon) and dispatches
 * a user action when clicked.
 */
export const Button = memo(function Button({ node, surfaceId }: A2UIComponentProps<Types.ButtonNode>) {
  const { theme, sendAction } = useA2UIComponent(node, surfaceId);
  const props = node.properties;

  const handleClick = useCallback(() => {
    if (props.action) {
      sendAction(props.action);
    }
  }, [props.action, sendAction]);

  return (
    <button
      className={classMapToString(theme.components.Button)}
      style={stylesToObject(theme.additionalStyles?.Button)}
      onClick={handleClick}
    >
      <ComponentNode node={props.child} surfaceId={surfaceId} />
    </button>
  );
});

export default Button;
