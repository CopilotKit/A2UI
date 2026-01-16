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

/**
 * Tailwind CSS theme for A2UI React components.
 *
 * This theme uses Tailwind utility classes for styling components.
 * It provides a modern, ShadCN-inspired look out of the box.
 *
 * @example
 * ```tsx
 * import { A2UIProvider, tailwindTheme } from '@a2ui/react';
 *
 * function App() {
 *   return (
 *     <A2UIProvider theme={tailwindTheme}>
 *       <A2UIRenderer surfaceId="main" />
 *     </A2UIProvider>
 *   );
 * }
 * ```
 *
 * @remarks
 * Requires Tailwind CSS to be configured in your project.
 * Some classes use CSS variables (e.g., `bg-background`, `text-foreground`)
 * that you may need to define in your Tailwind config or CSS.
 */
export const tailwindTheme: Types.Theme = {
  components: {
    // =========================================================================
    // Content Components
    // =========================================================================

    AudioPlayer: {
      'w-full': true,
      'rounded-lg': true,
      'bg-slate-100': true,
      'p-4': true,
    },

    Divider: {
      'shrink-0': true,
      'bg-neutral-200': true,
      'h-px': true,
      'w-full': true,
      'my-2': true,
    },

    // Icon - simple inline icon without container box
    Icon: {
      'inline-flex': true,
      'items-center': true,
      'justify-center': true,
      'shrink-0': true,
    },

    Image: {
      all: {
        'max-w-full': true,
        'h-auto': true,
        'rounded-md': true,
      },
      icon: {
        'w-5': true,
        'h-5': true,
        'rounded-none': true,
      },
      avatar: {
        'w-24': true,
        'h-24': true,
        'rounded-full': true,
        'object-cover': true,
        'mx-auto': true,
      },
      smallFeature: {
        'w-24': true,
        'h-auto': true,
        'rounded-lg': true,
      },
      mediumFeature: {
        'w-48': true,
        'h-auto': true,
        'rounded-lg': true,
      },
      largeFeature: {
        'w-96': true,
        'h-auto': true,
        'rounded-lg': true,
      },
      header: {
        'w-full': true,
        'h-auto': true,
        'rounded-lg': true,
        'object-cover': true,
      },
    },

    Text: {
      all: {
        'leading-normal': true,
      },
      h1: {
        'text-2xl': true,
        'font-medium': true,
        'text-neutral-900': true,
      },
      h2: {
        'text-xl': true,
        'font-medium': true,
        'text-neutral-900': true,
      },
      h3: {
        'text-base': true,
        'font-medium': true,
        'text-neutral-800': true,
      },
      h4: {
        'text-sm': true,
        'font-medium': true,
        'text-neutral-800': true,
      },
      h5: {
        'text-sm': true,
        'font-normal': true,
        'text-neutral-700': true,
      },
      caption: {
        'text-xs': true,
        'text-neutral-500': true,
      },
      body: {
        'text-sm': true,
        'text-neutral-600': true,
      },
    },

    Video: {
      'w-full': true,
      'rounded-lg': true,
      'bg-black': true,
    },

    // =========================================================================
    // Layout Components
    // =========================================================================

    Card: {
      'rounded-2xl': true,
      'p-4': true,
    },

    Column: {
      'flex': true,
      'flex-col': true,
    },

    List: {
      'flex': true,
      'flex-col': true,
      'overflow-auto': true,
    },

    Modal: {
      backdrop: {
        'fixed': true,
        'inset-0': true,
        'z-50': true,
        'bg-black/60': true,
        'backdrop-blur-sm': true,
      },
      element: {
        'fixed': true,
        'left-1/2': true,
        'top-1/2': true,
        'z-50': true,
        'w-full': true,
        'max-w-lg': true,
        '-translate-x-1/2': true,
        '-translate-y-1/2': true,
        'rounded-xl': true,
        'border': true,
        'border-slate-200': true,
        'bg-white': true,
        'p-6': true,
        'shadow-xl': true,
      },
    },

    Row: {
      'flex': true,
      'flex-row': true,
      'items-center': true,
    },

    Tabs: {
      container: {
        'w-full': true,
      },
      element: {
        'mt-4': true,
        'rounded-lg': true,
        'border': true,
        'border-slate-200': true,
        'bg-white': true,
        'p-4': true,
      },
      controls: {
        all: {
          'inline-flex': true,
          'items-center': true,
          'justify-center': true,
          'px-4': true,
          'py-2': true,
          'text-sm': true,
          'font-medium': true,
          'text-slate-600': true,
          'rounded-lg': true,
          'transition-colors': true,
          'hover:text-slate-900': true,
          'hover:bg-slate-100': true,
        },
        selected: {
          'inline-flex': true,
          'items-center': true,
          'justify-center': true,
          'px-4': true,
          'py-2': true,
          'text-sm': true,
          'font-medium': true,
          'text-slate-900': true,
          'bg-slate-100': true,
          'rounded-lg': true,
        },
      },
    },

    // =========================================================================
    // Interactive Components
    // =========================================================================

    // Button supports variants: primary (filled) and secondary (outline)
    // Default is primary (filled) unless primary: false is explicitly set
    Button: {
      primary: {
        'flex': true,
        'items-center': true,
        'justify-center': true,
        'gap-1': true,
        'whitespace-nowrap': true,
        'rounded-full': true,
        'text-sm': true,
        'font-medium': true,
        'transition-colors': true,
        'cursor-pointer': true,
        'disabled:pointer-events-none': true,
        'disabled:opacity-50': true,
        'bg-indigo-600': true,
        'text-white': true,
        'hover:bg-indigo-700': true,
        'min-h-9': true,
        'px-4': true,
        'py-2': true,
        'w-full': true,
      },
      secondary: {
        'flex': true,
        'items-center': true,
        'justify-center': true,
        'gap-1': true,
        'whitespace-nowrap': true,
        'rounded-full': true,
        'text-sm': true,
        'font-medium': true,
        'transition-colors': true,
        'cursor-pointer': true,
        'disabled:pointer-events-none': true,
        'disabled:opacity-50': true,
        'bg-neutral-100': true,
        'text-neutral-700': true,
        'hover:bg-neutral-200': true,
        'min-h-9': true,
        'px-4': true,
        'py-2': true,
        'w-full': true,
      },
    } as unknown as Record<string, boolean>,

    CheckBox: {
      container: {
        'flex': true,
        'items-center': true,
        'gap-3': true,
      },
      element: {
        'h-4': true,
        'w-4': true,
        'rounded': true,
        'border': true,
        'border-slate-300': true,
        'text-blue-600': true,
        'focus:ring-2': true,
        'focus:ring-blue-500': true,
        'focus:ring-offset-2': true,
        'disabled:cursor-not-allowed': true,
        'disabled:opacity-50': true,
      },
      label: {
        'text-sm': true,
        'font-medium': true,
        'text-slate-700': true,
        'leading-none': true,
      },
    },

    DateTimeInput: {
      container: {
        'grid': true,
        'gap-2': true,
      },
      element: {
        'flex': true,
        'h-10': true,
        'w-full': true,
        'rounded-lg': true,
        'border': true,
        'border-slate-300': true,
        'bg-white': true,
        'px-3': true,
        'py-2': true,
        'text-sm': true,
        'text-slate-900': true,
        'placeholder:text-slate-400': true,
        'focus:outline-none': true,
        'focus:ring-2': true,
        'focus:ring-blue-500': true,
        'focus:border-blue-500': true,
        'disabled:cursor-not-allowed': true,
        'disabled:opacity-50': true,
        'disabled:bg-slate-50': true,
      },
      label: {
        'text-sm': true,
        'font-medium': true,
        'text-slate-700': true,
      },
    },

    MultipleChoice: {
      container: {
        'grid': true,
        'gap-2': true,
      },
      element: {
        'flex': true,
        'h-10': true,
        'w-full': true,
        'items-center': true,
        'justify-between': true,
        'rounded-lg': true,
        'border': true,
        'border-slate-300': true,
        'bg-white': true,
        'px-3': true,
        'py-2': true,
        'text-sm': true,
        'text-slate-900': true,
        'focus:outline-none': true,
        'focus:ring-2': true,
        'focus:ring-blue-500': true,
        'focus:border-blue-500': true,
        'disabled:cursor-not-allowed': true,
        'disabled:opacity-50': true,
      },
      label: {
        'text-sm': true,
        'font-medium': true,
        'text-slate-700': true,
      },
    },

    Slider: {
      container: {
        'grid': true,
        'gap-2': true,
      },
      element: {
        'w-full': true,
        'h-2': true,
        'cursor-pointer': true,
        'appearance-none': true,
        'rounded-full': true,
        'bg-slate-200': true,
        'accent-blue-600': true,
      },
      label: {
        'text-sm': true,
        'font-medium': true,
        'text-slate-700': true,
      },
    },

    TextField: {
      container: {
        'grid': true,
        'gap-2': true,
      },
      element: {
        'flex': true,
        'h-10': true,
        'w-full': true,
        'rounded-lg': true,
        'border': true,
        'border-slate-300': true,
        'bg-white': true,
        'px-3': true,
        'py-2': true,
        'text-sm': true,
        'text-slate-900': true,
        'placeholder:text-slate-400': true,
        'focus:outline-none': true,
        'focus:ring-2': true,
        'focus:ring-blue-500': true,
        'focus:border-blue-500': true,
        'disabled:cursor-not-allowed': true,
        'disabled:opacity-50': true,
        'disabled:bg-slate-50': true,
      },
      label: {
        'text-sm': true,
        'font-medium': true,
        'text-slate-700': true,
      },
    },
  },

  // ===========================================================================
  // HTML Elements (used for markdown rendering and raw HTML)
  // ===========================================================================

  elements: {
    a: {
      'text-blue-600': true,
      'underline': true,
      'underline-offset-4': true,
      'hover:text-blue-800': true,
    },
    audio: {
      'w-full': true,
    },
    body: {},
    button: {
      'cursor-pointer': true,
    },
    h1: {
      'text-4xl': true,
      'font-bold': true,
      'tracking-tight': true,
    },
    h2: {
      'text-3xl': true,
      'font-semibold': true,
      'tracking-tight': true,
    },
    h3: {
      'text-2xl': true,
      'font-semibold': true,
    },
    h4: {
      'text-xl': true,
      'font-semibold': true,
    },
    h5: {
      'text-lg': true,
      'font-medium': true,
    },
    iframe: {
      'w-full': true,
      'border': true,
      'rounded-lg': true,
    },
    input: {
      'outline-none': true,
    },
    p: {
      'leading-7': true,
    },
    pre: {
      'bg-slate-100': true,
      'p-4': true,
      'rounded-lg': true,
      'overflow-x-auto': true,
      'text-sm': true,
    },
    textarea: {
      'outline-none': true,
      'resize-y': true,
      'min-h-[100px]': true,
    },
    video: {
      'w-full': true,
      'rounded-lg': true,
    },
  },

  // ===========================================================================
  // Markdown (class arrays for markdown-it renderer)
  // ===========================================================================

  markdown: {
    p: ['leading-7', 'mb-4'],
    h1: ['text-3xl', 'font-bold', 'tracking-tight', 'mb-4', 'mt-6'],
    h2: ['text-2xl', 'font-semibold', 'tracking-tight', 'mb-3', 'mt-5'],
    h3: ['text-xl', 'font-semibold', 'mb-2', 'mt-4'],
    h4: ['text-lg', 'font-medium', 'mb-2', 'mt-3'],
    h5: ['text-base', 'font-medium', 'mb-2', 'mt-3'],
    ul: ['list-disc', 'pl-6', 'mb-4', 'space-y-1'],
    ol: ['list-decimal', 'pl-6', 'mb-4', 'space-y-1'],
    li: ['leading-relaxed'],
    a: ['text-blue-600', 'underline', 'underline-offset-4', 'hover:text-blue-800'],
    strong: ['font-semibold'],
    em: ['italic'],
  },
};
