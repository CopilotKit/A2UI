import type { Theme } from '@a2ui/react';

/**
 * CopilotKit viewer theme — pre-computed from @copilotkit/a2ui-renderer's
 * viewer-theme.js so we can share one theme across both React and Lit viewers
 * without needing a runtime import of v0_8.Styles.merge.
 */

const aLight = {
  'typography-f-sf': true, 'typography-fs-n': true, 'typography-w-500': true,
  'layout-as-n': true, 'layout-dis-iflx': true, 'layout-al-c': true,
  'color-c-n5': true,
};

const bodyLight = {
  'typography-f-s': true, 'typography-fs-n': true, 'typography-w-400': true,
  'layout-mt-0': true, 'layout-mb-2': true, 'typography-sz-bm': true,
  'color-c-n5': true,
};

const buttonLight = {
  'typography-f-sf': true, 'typography-fs-n': true, 'typography-w-500': true,
  'layout-pt-3': true, 'layout-pb-3': true, 'layout-pl-5': true,
  'layout-pr-5': true, 'layout-mb-1': true, 'border-br-16': true,
  'border-bw-0': true, 'border-c-n70': true, 'border-bs-s': true,
  'color-bgc-s30': true, 'color-c-n100': true, 'behavior-ho-80': true,
};

const h1Light = {
  'typography-f-sf': true, 'typography-fs-n': true, 'typography-w-500': true,
  'layout-mt-0': true, 'layout-mb-2': true, 'color-c-n5': true,
  'typography-sz-tl': true,
};

const h2Light = {
  'typography-f-sf': true, 'typography-fs-n': true, 'typography-w-500': true,
  'layout-mt-0': true, 'layout-mb-2': true, 'color-c-n5': true,
  'typography-sz-tm': true,
};

const h3Light = {
  'typography-f-sf': true, 'typography-fs-n': true, 'typography-w-500': true,
  'layout-mt-0': true, 'layout-mb-2': true, 'color-c-n5': true,
  'typography-sz-ts': true,
};

const inputLight = {
  'typography-f-sf': true, 'typography-fs-n': true, 'typography-w-400': true,
  'layout-pl-4': true, 'layout-pr-4': true, 'layout-pt-2': true,
  'layout-pb-2': true, 'border-br-6': true, 'border-bw-1': true,
  'color-bc-s70': true, 'border-bs-s': true, 'layout-as-n': true,
  'color-c-n5': true,
};

const pLight = {
  'typography-f-s': true, 'typography-fs-n': true, 'typography-w-400': true,
  'layout-m-0': true, 'typography-sz-bm': true, 'layout-as-n': true,
  'color-c-n35': true,
};

const preLight = {
  'typography-f-c': true, 'typography-fs-n': true, 'typography-w-400': true,
  'typography-sz-bm': true, 'typography-ws-p': true, 'layout-as-n': true,
  'color-c-n35': true,
};

const textareaLight = {
  'typography-f-sf': true, 'typography-fs-n': true, 'typography-w-400': true,
  'layout-pl-4': true, 'layout-pr-4': true, 'layout-pt-2': true,
  'layout-pb-2': true, 'border-br-6': true, 'border-bw-1': true,
  'color-bc-s70': true, 'border-bs-s': true, 'layout-as-n': true,
  'color-c-n5': true, 'layout-r-none': true, 'layout-fs-c': true,
};

const orderedListLight = {
  'typography-f-s': true, 'typography-fs-n': true, 'typography-w-400': true,
  'layout-m-0': true, 'typography-sz-bm': true, 'layout-as-n': true,
  'color-c-n35': true,
};

const unorderedListLight = { ...orderedListLight };
const listItemLight = { ...orderedListLight };

export const copilotKitTheme: Theme = {
  additionalStyles: {
    Button: { '--n-35': 'var(--n-100)' },
    Card: { padding: '32px' },
  },
  components: {
    AudioPlayer: {},
    Button: {
      'layout-pt-2': true, 'layout-pb-2': true, 'layout-pl-3': true,
      'layout-pr-3': true, 'border-br-12': true, 'border-bw-0': true,
      'border-bs-s': true, 'color-bgc-p30': true, 'color-c-n100': true,
      'behavior-ho-70': true,
    },
    Card: { 'border-br-9': true, 'color-bgc-p100': true },
    CheckBox: {
      element: {
        'layout-m-0': true, 'layout-mr-2': true, 'layout-p-2': true,
        'border-br-12': true, 'border-bw-1': true, 'border-bs-s': true,
        'color-bgc-p100': true, 'color-bc-p60': true, 'color-c-n30': true,
        'color-c-p30': true,
      },
      label: {
        'color-c-p30': true, 'typography-f-sf': true, 'typography-v-r': true,
        'typography-w-400': true, 'layout-flx-1': true, 'typography-sz-ll': true,
      },
      container: { 'layout-dsp-iflex': true, 'layout-al-c': true },
    },
    Column: { 'layout-g-2': true },
    DateTimeInput: {
      container: {},
      label: {},
      element: {
        'layout-pt-2': true, 'layout-pb-2': true, 'layout-pl-3': true,
        'layout-pr-3': true, 'border-br-12': true, 'border-bw-1': true,
        'border-bs-s': true, 'color-bgc-p100': true, 'color-bc-p60': true,
        'color-c-n30': true, 'color-c-p30': true,
      },
    },
    Divider: {},
    Image: {
      all: {
        'border-br-5': true, 'layout-el-cv': true, 'layout-w-100': true,
        'layout-h-100': true,
      },
      avatar: { 'is-avatar': true },
      header: {},
      icon: {},
      largeFeature: {},
      mediumFeature: {},
      smallFeature: {},
    },
    Icon: {},
    List: { 'layout-g-4': true, 'layout-p-2': true },
    Modal: {
      backdrop: { 'color-bbgc-p60_20': true },
      element: {
        'border-br-2': true, 'color-bgc-p100': true, 'layout-p-4': true,
        'border-bw-1': true, 'border-bs-s': true, 'color-bc-p80': true,
      },
    },
    MultipleChoice: { container: {}, label: {}, element: {} },
    Row: { 'layout-g-4': true },
    Slider: { container: {}, label: {}, element: {} },
    Tabs: {
      container: {},
      controls: { all: {}, selected: {} },
      element: {},
    },
    Text: {
      all: { 'layout-w-100': true, 'layout-g-2': true },
      h1: {
        'typography-f-sf': true, 'typography-v-r': true, 'typography-w-400': true,
        'layout-m-0': true, 'layout-p-0': true, 'typography-sz-tl': true,
      },
      h2: {
        'typography-f-sf': true, 'typography-v-r': true, 'typography-w-400': true,
        'layout-m-0': true, 'layout-p-0': true, 'typography-sz-tm': true,
      },
      h3: {
        'typography-f-sf': true, 'typography-v-r': true, 'typography-w-400': true,
        'layout-m-0': true, 'layout-p-0': true, 'typography-sz-ts': true,
      },
      h4: {
        'typography-f-sf': true, 'typography-v-r': true, 'typography-w-400': true,
        'layout-m-0': true, 'layout-p-0': true, 'typography-sz-bl': true,
      },
      h5: {
        'typography-f-sf': true, 'typography-v-r': true, 'typography-w-400': true,
        'layout-m-0': true, 'layout-p-0': true, 'typography-sz-bm': true,
      },
      body: {},
      caption: {},
    },
    TextField: {
      container: {
        'typography-sz-bm': true, 'layout-w-100': true, 'layout-g-2': true,
        'layout-dsp-flexhor': true, 'layout-al-c': true,
      },
      label: { 'layout-flx-0': true },
      element: {
        'typography-sz-bm': true, 'layout-pt-2': true, 'layout-pb-2': true,
        'layout-pl-3': true, 'layout-pr-3': true, 'border-br-12': true,
        'border-bw-1': true, 'border-bs-s': true, 'color-bgc-p100': true,
        'color-bc-p60': true, 'color-c-n30': true, 'color-c-p30': true,
      },
    },
    Video: { 'border-br-5': true, 'layout-el-cv': true },
  },
  elements: {
    a: aLight,
    audio: { 'layout-w-100': true },
    body: bodyLight,
    button: buttonLight,
    h1: h1Light,
    h2: h2Light,
    h3: h3Light,
    h4: {},
    h5: {},
    iframe: { 'behavior-sw-n': true },
    input: inputLight,
    p: pLight,
    pre: preLight,
    textarea: textareaLight,
    video: { 'layout-el-cv': true },
  },
  markdown: {
    p: Object.keys(pLight),
    h1: Object.keys(h1Light),
    h2: Object.keys(h2Light),
    h3: Object.keys(h3Light),
    h4: [],
    h5: [],
    ul: Object.keys(unorderedListLight),
    ol: Object.keys(orderedListLight),
    li: Object.keys(listItemLight),
    a: Object.keys(aLight),
    strong: [],
    em: [],
  },
};
