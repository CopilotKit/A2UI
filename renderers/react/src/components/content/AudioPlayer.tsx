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

/**
 * AudioPlayer component - renders an audio player with optional description.
 */
export function AudioPlayer({ node, surfaceId }: A2UIComponentProps<Types.AudioPlayerNode>) {
  const { theme, resolveString } = useA2UIComponent(node, surfaceId);
  const props = node.properties;

  const url = resolveString(props.url);
  const description = resolveString(props.description ?? null);

  if (!url) {
    return null;
  }

  return (
    <div
      className={classMapToString(theme.components.AudioPlayer)}
      style={stylesToObject(theme.additionalStyles?.AudioPlayer)}
    >
      {description && <p className="a2ui-audio-player__description">{description}</p>}
      <audio src={url} controls style={{ width: '100%' }} />
    </div>
  );
}

export default AudioPlayer;
