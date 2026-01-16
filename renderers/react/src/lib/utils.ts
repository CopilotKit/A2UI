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

import { clsx, type ClassValue } from 'clsx';

/**
 * Utility function to merge class names.
 * Combines clsx for conditional classes.
 *
 * @param inputs - Class values to merge
 * @returns Merged class name string
 *
 * @example
 * cn('base-class', condition && 'conditional-class', { 'object-class': true })
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Converts a theme class map (Record<string, boolean>) to a className string.
 * Re-exported from theme/utils for convenience.
 *
 * @param classMap - An object where keys are class names and values are booleans
 * @returns A space-separated string of class names where the value is true
 */
export { classMapToString, stylesToObject } from '../theme/utils';
