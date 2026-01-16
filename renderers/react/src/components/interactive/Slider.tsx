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

import { useState, useCallback, useEffect, useId } from 'react';
import type { Types } from '@a2ui/lit/0.8';
import type { A2UIComponentProps } from '../../types';
import { useA2UIComponent } from '../../hooks/useA2UIComponent';
import { classMapToString, stylesToObject } from '../../lib/utils';

/**
 * Slider component - a numeric value selector with a range.
 *
 * Supports two-way data binding for the value.
 */
export function Slider({ node, surfaceId }: A2UIComponentProps<Types.SliderNode>) {
  const { theme, resolveNumber, setValue, getValue } = useA2UIComponent(
    node,
    surfaceId
  );
  const props = node.properties;
  const id = useId();

  const valuePath = props.value?.path;
  const initialValue = resolveNumber(props.value) ?? 0;
  const minValue = props.minValue ?? 0;
  const maxValue = props.maxValue ?? 100;

  const [value, setLocalValue] = useState(initialValue);

  // Sync with external data model changes
  useEffect(() => {
    if (valuePath) {
      const externalValue = getValue(valuePath);
      if (externalValue !== null && Number(externalValue) !== value) {
        setLocalValue(Number(externalValue));
      }
    }
  }, [valuePath, getValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      setLocalValue(newValue);

      // Two-way binding: update data model
      if (valuePath) {
        setValue(valuePath, newValue);
      }
    },
    [valuePath, setValue]
  );

  return (
    <div
      className={classMapToString(theme.components.Slider.container)}
      style={stylesToObject(theme.additionalStyles?.Slider)}
    >
      <input
        type="range"
        id={id}
        value={value}
        min={minValue}
        max={maxValue}
        onChange={handleChange}
        className={classMapToString(theme.components.Slider.element)}
      />
      <span className="a2ui-slider__value">{value}</span>
    </div>
  );
}

export default Slider;
