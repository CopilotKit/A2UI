import type { Types } from '@a2ui/lit/0.8';

// Helper to create a surface update message
function createSurfaceUpdate(
  components: Array<{ id: string; component: Record<string, unknown> }>,
  surfaceId: string
): Types.ServerToClientMessage {
  return {
    surfaceUpdate: {
      surfaceId,
      components: components.map((c) => ({
        id: c.id,
        component: c.component,
      })),
    },
  } as Types.ServerToClientMessage;
}

// Helper to create a begin rendering message
function createBeginRendering(
  rootId: string,
  surfaceId: string
): Types.ServerToClientMessage {
  return {
    beginRendering: {
      root: rootId,
      surfaceId,
    },
  } as Types.ServerToClientMessage;
}

// Helper for simple component messages
function createSimpleMessages(
  id: string,
  componentType: string,
  props: Record<string, unknown>
): { messages: Types.ServerToClientMessage[]; surfaceId: string } {
  const surfaceId = `surface-${id}`;
  return {
    messages: [
      createSurfaceUpdate([{ id, component: { [componentType]: props } }], surfaceId),
      createBeginRendering(id, surfaceId),
    ],
    surfaceId,
  };
}

// Helper to create button with text child
function createButtonMessages(
  id: string,
  label: string,
  actionName: string,
  primary = true
): { messages: Types.ServerToClientMessage[]; surfaceId: string } {
  const surfaceId = `surface-${id}`;
  const textId = `${id}-text`;

  return {
    messages: [
      createSurfaceUpdate(
        [
          {
            id: textId,
            component: {
              Text: { text: { literalString: label } },
            },
          },
          {
            id,
            component: {
              Button: {
                child: textId,
                action: { name: actionName },
                primary,
              },
            },
          },
        ],
        surfaceId
      ),
      createBeginRendering(id, surfaceId),
    ],
    surfaceId,
  };
}

// Sample messages for each component type
export const samples = {
  // Text samples
  textBasic: createSimpleMessages('text-basic', 'Text', {
    text: { literalString: 'Hello, this is a basic text component!' },
  }),

  textMarkdown: createSimpleMessages('text-md', 'Text', {
    text: {
      literalString: `## Markdown Support

This text component supports **bold**, *italic*, and \`inline code\`.

- Bullet point one
- Bullet point two
- Bullet point three`,
    },
  }),

  textH1: createSimpleMessages('text-h1', 'Text', {
    text: { literalString: 'Heading 1 Style' },
    usageHint: 'h1',
  }),

  textH2: createSimpleMessages('text-h2', 'Text', {
    text: { literalString: 'Heading 2 Style' },
    usageHint: 'h2',
  }),

  textCaption: createSimpleMessages('text-caption', 'Text', {
    text: { literalString: 'This is a caption style text' },
    usageHint: 'caption',
  }),

  // Button samples
  buttonPrimary: createButtonMessages('btn-primary', 'Primary Button', 'primary-click', true),
  buttonSecondary: createButtonMessages('btn-secondary', 'Secondary Button', 'secondary-click', false),
  buttonDisabled: (() => {
    const id = 'btn-disabled';
    const surfaceId = `surface-${id}`;
    const textId = `${id}-text`;
    return {
      messages: [
        createSurfaceUpdate(
          [
            {
              id: textId,
              component: {
                Text: { text: { literalString: 'Disabled Button' } },
              },
            },
            {
              id,
              component: {
                Button: {
                  child: textId,
                  action: { name: 'disabled-click' },
                  disabled: true,
                },
              },
            },
          ],
          surfaceId
        ),
        createBeginRendering(id, surfaceId),
      ],
      surfaceId,
    };
  })(),

  // Icon samples
  iconHome: createSimpleMessages('icon-home', 'Icon', {
    name: { literalString: 'home' },
  }),

  iconSearch: createSimpleMessages('icon-search', 'Icon', {
    name: { literalString: 'search' },
  }),

  iconSettings: createSimpleMessages('icon-settings', 'Icon', {
    name: { literalString: 'settings' },
  }),

  iconFavorite: createSimpleMessages('icon-favorite', 'Icon', {
    name: { literalString: 'favorite' },
  }),

  // Image sample - uses 'url' not 'source'
  image: createSimpleMessages('image-1', 'Image', {
    url: {
      literalString:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    },
  }),

  // TextField samples
  textFieldBasic: createSimpleMessages('tf-basic', 'TextField', {
    label: { literalString: 'Your Name' },
  }),

  textFieldNumber: createSimpleMessages('tf-number', 'TextField', {
    label: { literalString: 'Quantity' },
    type: 'number',
  }),

  textFieldLongText: createSimpleMessages('tf-long', 'TextField', {
    label: { literalString: 'Description' },
    type: 'longText',
  }),

  // CheckBox sample - uses 'value' (boolean) not 'checked'
  checkbox: createSimpleMessages('cb-1', 'CheckBox', {
    label: { literalString: 'I agree to the terms and conditions' },
    value: { literalBoolean: false },
  }),

  checkboxChecked: createSimpleMessages('cb-2', 'CheckBox', {
    label: { literalString: 'Subscribe to newsletter' },
    value: { literalBoolean: true },
  }),

  // Slider sample - needs 'value' as NumberValue
  slider: createSimpleMessages('slider-1', 'Slider', {
    value: { literalNumber: 50 },
  }),

  // Divider sample
  dividerHorizontal: createSimpleMessages('div-h', 'Divider', {}),

  dividerVertical: createSimpleMessages('div-v', 'Divider', {
    axis: 'vertical',
  }),

  // Multiple choice - needs both 'options' (for display) and 'selections' (for data binding)
  multipleChoice: createSimpleMessages('mc-1', 'MultipleChoice', {
    options: [
      { label: { literalString: 'Red' }, value: 'red' },
      { label: { literalString: 'Green' }, value: 'green' },
      { label: { literalString: 'Blue' }, value: 'blue' },
    ],
    selections: { path: 'selected_color' },
  }),

  // DateTimeInput - needs 'value'
  dateTime: createSimpleMessages('dt-1', 'DateTimeInput', {
    value: { literalString: '2025-01-15' },
  }),

  // Card with content - uses 'children' not 'content'
  card: (() => {
    const surfaceId = 'surface-card-1';
    const cardId = 'card-1';
    const titleId = 'card-title';
    const bodyId = 'card-body';
    const buttonTextId = 'card-btn-text';
    const buttonId = 'card-btn';

    return {
      messages: [
        createSurfaceUpdate(
          [
            {
              id: titleId,
              component: {
                Text: {
                  text: { literalString: 'Card Title' },
                  usageHint: 'h2',
                },
              },
            },
            {
              id: bodyId,
              component: {
                Text: {
                  text: {
                    literalString:
                      'This is a card component with a title, body text, and an action button.',
                  },
                },
              },
            },
            {
              id: buttonTextId,
              component: {
                Text: { text: { literalString: 'Learn More' } },
              },
            },
            {
              id: buttonId,
              component: {
                Button: {
                  child: buttonTextId,
                  action: { name: 'card-action' },
                },
              },
            },
            {
              id: cardId,
              component: {
                Card: {
                  children: [titleId, bodyId, buttonId],
                },
              },
            },
          ],
          surfaceId
        ),
        createBeginRendering(cardId, surfaceId),
      ] as Types.ServerToClientMessage[],
      surfaceId,
    };
  })(),

  // Row layout - uses 'children' not 'content'
  row: (() => {
    const surfaceId = 'surface-row-1';
    const rowId = 'row-1';
    const items = ['home', 'search', 'settings', 'favorite'].map((icon, i) => ({
      id: `row-icon-${i}`,
      component: {
        Icon: {
          name: { literalString: icon },
        },
      },
    }));

    return {
      messages: [
        createSurfaceUpdate(
          [
            ...items,
            {
              id: rowId,
              component: {
                Row: {
                  children: items.map((i) => i.id),
                },
              },
            },
          ],
          surfaceId
        ),
        createBeginRendering(rowId, surfaceId),
      ] as Types.ServerToClientMessage[],
      surfaceId,
    };
  })(),

  // Column layout - uses 'children' not 'content'
  column: (() => {
    const surfaceId = 'surface-col-1';
    const colId = 'col-1';
    const items = [
      {
        id: 'col-h',
        component: { Text: { text: { literalString: 'Column Layout' }, usageHint: 'h2' } },
      },
      { id: 'col-t1', component: { Text: { text: { literalString: 'First item in the column' } } } },
      {
        id: 'col-t2',
        component: { Text: { text: { literalString: 'Second item in the column' } } },
      },
      { id: 'col-t3', component: { Text: { text: { literalString: 'Third item in the column' } } } },
    ];

    return {
      messages: [
        createSurfaceUpdate(
          [
            ...items,
            {
              id: colId,
              component: {
                Column: {
                  children: items.map((i) => i.id),
                },
              },
            },
          ],
          surfaceId
        ),
        createBeginRendering(colId, surfaceId),
      ] as Types.ServerToClientMessage[],
      surfaceId,
    };
  })(),
};
