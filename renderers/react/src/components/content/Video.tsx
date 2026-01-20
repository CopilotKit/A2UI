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
import { classMapToString, stylesToObject } from '../../lib/utils';

/**
 * Check if a URL is a YouTube URL and extract the video ID.
 */
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match.length > 1) {
      // Non-null assertion is safe here since we checked match.length > 1
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return match[1]!;
    }
  }
  return null;
}

/**
 * Video component - renders a video player.
 *
 * Supports regular video URLs and YouTube URLs (renders as embedded iframe).
 */
export const Video = memo(function Video({ node, surfaceId }: A2UIComponentProps<Types.VideoNode>) {
  const { theme, resolveString } = useA2UIComponent(node, surfaceId);
  const props = node.properties;

  const url = resolveString(props.url);

  if (!url) {
    return null;
  }

  const youtubeId = getYouTubeVideoId(url);

  if (youtubeId) {
    return (
      <div
        className={classMapToString(theme.components.Video)}
        style={stylesToObject(theme.additionalStyles?.Video)}
      >
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 'none', width: '100%', aspectRatio: '16/9' }}
        />
      </div>
    );
  }

  return (
    <video
      src={url}
      controls
      className={classMapToString(theme.components.Video)}
      style={stylesToObject(theme.additionalStyles?.Video)}
    />
  );
});

export default Video;
