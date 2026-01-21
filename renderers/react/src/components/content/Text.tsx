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

import { useMemo, memo } from 'react';
import type { Types } from '@a2ui/lit/0.8';
import type { A2UIComponentProps } from '../../types';
import { useA2UIComponent } from '../../hooks/useA2UIComponent';
import { classMapToString, stylesToObject, mergeClassMaps } from '../../lib/utils';

type UsageHint = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'caption' | 'body';

interface HintedStyles {
  h1: Record<string, string>;
  h2: Record<string, string>;
  h3: Record<string, string>;
  h4: Record<string, string>;
  h5: Record<string, string>;
  body: Record<string, string>;
  caption: Record<string, string>;
}

function isHintedStyles(styles: unknown): styles is HintedStyles {
  if (typeof styles !== 'object' || !styles || Array.isArray(styles)) return false;
  const expected = ['h1', 'h2', 'h3', 'h4', 'h5', 'caption', 'body'];
  return expected.some((v) => v in styles);
}

/**
 * Markdown-it instance (lazily loaded).
 * This is an optional dependency - if not installed, text renders as plain text.
 */
type MarkdownIt = {
  render: (text: string) => string;
};

let markdownRenderer: MarkdownIt | null = null;
let markdownLoadAttempted = false;

async function loadMarkdownIt(): Promise<void> {
  if (markdownLoadAttempted) return;
  markdownLoadAttempted = true;

  try {
    const MarkdownIt = (await import('markdown-it')).default;
    markdownRenderer = new MarkdownIt({
      html: false, // Security: disable raw HTML
      breaks: true, // Convert \n to <br>
      linkify: true, // Auto-convert URLs to links
      typographer: true, // Smart quotes, dashes, etc.
    });
  } catch {
    // markdown-it not installed, will render as plain text
  }
}

// Start loading markdown-it immediately
loadMarkdownIt();

/**
 * Apply theme classes to markdown HTML elements.
 * Replaces default element tags with themed versions.
 */
function applyMarkdownTheme(html: string, markdownTheme: Types.Theme['markdown']): string {
  if (!markdownTheme) return html;

  // Map of element -> classes
  const replacements: Array<[RegExp, string]> = [];

  for (const [element, classes] of Object.entries(markdownTheme)) {
    if (!classes || (Array.isArray(classes) && classes.length === 0)) continue;

    const classString = Array.isArray(classes) ? classes.join(' ') : classMapToString(classes);
    if (!classString) continue;

    // Create regex to match opening tags (handles self-closing and regular)
    const tagRegex = new RegExp(`<${element}(?=\\s|>|/>)`, 'gi');
    replacements.push([tagRegex, `<${element} class="${classString}"`]);
  }

  let result = html;
  for (const [regex, replacement] of replacements) {
    result = result.replace(regex, replacement);
  }

  return result;
}

/**
 * Text component - renders text content with optional markdown support.
 *
 * When markdown-it is installed, text is parsed as markdown and rendered as HTML.
 * Supports usageHint values: h1, h2, h3, h4, h5, caption, body
 *
 * @example With markdown support:
 * ```bash
 * npm install markdown-it
 * ```
 *
 * Markdown features supported:
 * - **Bold** and *italic* text
 * - Lists (ordered and unordered)
 * - `inline code` and code blocks
 * - [Links](url) (auto-linkified URLs too)
 * - Blockquotes
 * - Horizontal rules
 *
 * Note: Raw HTML is disabled for security.
 */
export const Text = memo(function Text({ node, surfaceId }: A2UIComponentProps<Types.TextNode>) {
  const { theme, resolveString } = useA2UIComponent(node, surfaceId);
  const props = node.properties;

  const textValue = resolveString(props.text);
  const usageHint = props.usageHint as UsageHint | undefined;

  // Get merged classes (matches Lit's Styles.merge)
  const classes = mergeClassMaps(
    theme.components.Text.all,
    usageHint ? theme.components.Text[usageHint] : {}
  );

  // Get additional styles based on usage hint
  const additionalStyles = useMemo(() => {
    const textStyles = theme.additionalStyles?.Text;
    if (!textStyles) return undefined;

    if (isHintedStyles(textStyles)) {
      const hint = usageHint ?? 'body';
      return stylesToObject(textStyles[hint]);
    }
    return stylesToObject(textStyles as Record<string, string>);
  }, [theme.additionalStyles?.Text, usageHint]);

  // Always use markdown rendering when available (matches Lit behavior)
  // Lit always passes text through markdown directive, even plain text
  const useMarkdown = markdownRenderer !== null;

  // Render markdown content
  const renderedContent = useMemo(() => {
    if (textValue === null || textValue === undefined) {
      return null;
    }

    // Always use markdown when available (matches Lit behavior)
    if (markdownRenderer && useMarkdown) {
      // Add markdown prefix based on usageHint (matches Lit behavior)
      let markdownText = textValue;
      switch (usageHint) {
        case 'h1':
          markdownText = `# ${markdownText}`;
          break;
        case 'h2':
          markdownText = `## ${markdownText}`;
          break;
        case 'h3':
          markdownText = `### ${markdownText}`;
          break;
        case 'h4':
          markdownText = `#### ${markdownText}`;
          break;
        case 'h5':
          markdownText = `##### ${markdownText}`;
          break;
        case 'caption':
          markdownText = `*${markdownText}*`;
          break;
        default:
          break; // Body - no prefix
      }

      const rawHtml = markdownRenderer.render(markdownText);
      const themedHtml = applyMarkdownTheme(rawHtml, theme.markdown);
      return { __html: themedHtml };
    }

    // Fallback: render as plain text (escape HTML)
    return null;
  }, [textValue, theme.markdown, useMarkdown, usageHint]);

  if (textValue === null || textValue === undefined) {
    return null;
  }

  // Always use <section> wrapper to match Lit renderer
  // Render with markdown (dangerouslySetInnerHTML) - matches Lit structure
  if (renderedContent) {
    return (
      <section
        className={classMapToString(classes)}
        style={additionalStyles}
        dangerouslySetInnerHTML={renderedContent}
      />
    );
  }

  // Fallback: render as plain text
  return (
    <section
      className={classMapToString(classes)}
      style={additionalStyles}
    >
      {textValue}
    </section>
  );
});

export default Text;
