/**
 * Shared component fixtures for visual parity testing.
 * These fixtures are used by both React and Lit minimal pages.
 */

export interface ComponentFixture {
  root: string;
  components: Array<{
    id: string;
    component: Record<string, unknown>;
  }>;
}

// Text component fixtures
export const textBasic: ComponentFixture = {
  root: 'text-1',
  components: [
    {
      id: 'text-1',
      component: {
        Text: { text: { literalString: 'Hello, this is basic text.' } },
      },
    },
  ],
};

export const textH1: ComponentFixture = {
  root: 'text-h1',
  components: [
    {
      id: 'text-h1',
      component: {
        Text: { text: { literalString: 'Heading 1' }, usageHint: 'h1' },
      },
    },
  ],
};

export const textH2: ComponentFixture = {
  root: 'text-h2',
  components: [
    {
      id: 'text-h2',
      component: {
        Text: { text: { literalString: 'Heading 2' }, usageHint: 'h2' },
      },
    },
  ],
};

export const textCaption: ComponentFixture = {
  root: 'text-caption',
  components: [
    {
      id: 'text-caption',
      component: {
        Text: { text: { literalString: 'Caption text' }, usageHint: 'caption' },
      },
    },
  ],
};

// Button component fixtures
export const buttonPrimary: ComponentFixture = {
  root: 'btn-1',
  components: [
    {
      id: 'btn-text',
      component: {
        Text: { text: { literalString: 'Primary Button' } },
      },
    },
    {
      id: 'btn-1',
      component: {
        Button: { child: 'btn-text', action: { name: 'click' }, primary: true },
      },
    },
  ],
};

export const buttonSecondary: ComponentFixture = {
  root: 'btn-2',
  components: [
    {
      id: 'btn-text-2',
      component: {
        Text: { text: { literalString: 'Secondary Button' } },
      },
    },
    {
      id: 'btn-2',
      component: {
        Button: { child: 'btn-text-2', action: { name: 'click' }, primary: false },
      },
    },
  ],
};

// Icon component fixtures
export const icon: ComponentFixture = {
  root: 'icon-1',
  components: [
    {
      id: 'icon-1',
      component: {
        Icon: { name: { literalString: 'home' } },
      },
    },
  ],
};

// Card component fixture
export const card: ComponentFixture = {
  root: 'card-1',
  components: [
    {
      id: 'card-title',
      component: {
        Text: { text: { literalString: 'Card Title' }, usageHint: 'h2' },
      },
    },
    {
      id: 'card-body',
      component: {
        Text: { text: { literalString: 'Card body content goes here.' } },
      },
    },
    {
      id: 'card-1',
      component: {
        Card: { children: ['card-title', 'card-body'] },
      },
    },
  ],
};

// Checkbox component fixtures
export const checkboxUnchecked: ComponentFixture = {
  root: 'cb-1',
  components: [
    {
      id: 'cb-1',
      component: {
        CheckBox: {
          label: { literalString: 'Unchecked option' },
          value: { literalBoolean: false },
        },
      },
    },
  ],
};

export const checkboxChecked: ComponentFixture = {
  root: 'cb-2',
  components: [
    {
      id: 'cb-2',
      component: {
        CheckBox: {
          label: { literalString: 'Checked option' },
          value: { literalBoolean: true },
        },
      },
    },
  ],
};

// TextField component fixture
export const textField: ComponentFixture = {
  root: 'tf-1',
  components: [
    {
      id: 'tf-1',
      component: {
        TextField: { label: { literalString: 'Your Name' } },
      },
    },
  ],
};

// Slider component fixture
export const slider: ComponentFixture = {
  root: 'slider-1',
  components: [
    {
      id: 'slider-1',
      component: {
        Slider: { value: { literalNumber: 50 } },
      },
    },
  ],
};

// Divider component fixtures
export const dividerHorizontal: ComponentFixture = {
  root: 'div-h',
  components: [
    {
      id: 'div-h',
      component: {
        Divider: {},
      },
    },
  ],
};

export const dividerVertical: ComponentFixture = {
  root: 'div-v',
  components: [
    {
      id: 'div-v',
      component: {
        Divider: { axis: 'vertical' },
      },
    },
  ],
};

// Row layout fixture
export const row: ComponentFixture = {
  root: 'row-1',
  components: [
    { id: 'row-icon-1', component: { Icon: { name: { literalString: 'home' } } } },
    { id: 'row-icon-2', component: { Icon: { name: { literalString: 'search' } } } },
    { id: 'row-icon-3', component: { Icon: { name: { literalString: 'settings' } } } },
    {
      id: 'row-1',
      component: {
        Row: { children: ['row-icon-1', 'row-icon-2', 'row-icon-3'] },
      },
    },
  ],
};

// Column layout fixture
export const column: ComponentFixture = {
  root: 'col-1',
  components: [
    { id: 'col-text-1', component: { Text: { text: { literalString: 'First item' } } } },
    { id: 'col-text-2', component: { Text: { text: { literalString: 'Second item' } } } },
    { id: 'col-text-3', component: { Text: { text: { literalString: 'Third item' } } } },
    {
      id: 'col-1',
      component: {
        Column: { children: ['col-text-1', 'col-text-2', 'col-text-3'] },
      },
    },
  ],
};

// All fixtures for iteration
export const allFixtures = {
  textBasic,
  textH1,
  textH2,
  textCaption,
  buttonPrimary,
  buttonSecondary,
  icon,
  card,
  checkboxUnchecked,
  checkboxChecked,
  textField,
  slider,
  dividerHorizontal,
  dividerVertical,
  row,
  column,
} as const;

export type FixtureName = keyof typeof allFixtures;
