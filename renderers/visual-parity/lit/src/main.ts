import { v0_8 } from '@a2ui/lit';
import * as UI from '@a2ui/lit/ui';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { allFixtures, type FixtureName, type ComponentFixture } from '../../fixtures';

// Inject structural styles
const styleEl = document.createElement('style');
styleEl.textContent = v0_8.Styles.structuralStyles;
document.head.appendChild(styleEl);

// Default theme (same as React's litTheme for visual parity)
const defaultTheme: v0_8.Types.Theme = {
  components: {
    Text: {
      all: { 'typography-f-s': true, 'typography-fs-n': true, 'typography-w-400': true, 'typography-sz-bm': true, 'color-c-n10': true, 'layout-w-100': true },
      h1: { 'typography-f-sf': true, 'typography-w-500': true, 'typography-sz-hl': true },
      h2: { 'typography-f-sf': true, 'typography-w-500': true, 'typography-sz-hm': true },
      h3: { 'typography-f-sf': true, 'typography-w-500': true, 'typography-sz-hs': true },
      caption: { 'typography-sz-ls': true, 'color-c-n40': true },
    },
    Icon: { 'g-icon': true, 'filled-heavy': true },
    Image: { all: { 'layout-w-100': true }, avatar: { 'border-br-50': true } },
    Button: { 'layout-dis-iflx': true, 'layout-al-c': true, 'layout-jc-c': true, 'layout-g-2': true, 'layout-pt-3': true, 'layout-pb-3': true, 'layout-pl-5': true, 'layout-pr-5': true, 'border-br-16': true, 'border-bw-0': true, 'color-bgc-p40': true, 'color-c-n100': true, 'typography-f-sf': true, 'typography-w-500': true },
    Card: { 'layout-p-4': true, 'layout-dis-flx': true, 'layout-fd-c': true, 'layout-g-3': true, 'border-br-12': true, 'color-bgc-n98': true },
    Row: { 'layout-dis-flx': true, 'layout-fd-r': true, 'layout-g-2': true, 'layout-w-100': true },
    Column: { 'layout-dis-flx': true, 'layout-fd-c': true, 'layout-g-2': true, 'layout-w-100': true },
    List: { 'layout-dis-flx': true, 'layout-fd-c': true, 'layout-g-2': true, 'layout-w-100': true },
    Divider: { 'layout-w-100': true, 'layout-h-1': true, 'color-bgc-n90': true },
    TextField: { container: { 'layout-dis-flx': true, 'layout-fd-c': true, 'layout-g-1': true }, label: { 'typography-f-sf': true, 'typography-sz-bm': true, 'color-c-n40': true }, element: { 'layout-p-3': true, 'border-br-8': true, 'border-bw-1': true, 'color-bc-n80': true } },
    CheckBox: { container: { 'layout-dis-flx': true, 'layout-al-c': true, 'layout-g-2': true }, element: {}, label: { 'typography-f-s': true, 'typography-sz-bm': true } },
    Slider: { container: { 'layout-dis-flx': true, 'layout-fd-c': true, 'layout-g-1': true, 'layout-w-100': true }, label: { 'typography-f-sf': true, 'typography-sz-bm': true, 'color-c-n40': true }, element: { 'layout-w-100': true } },
    DateTimeInput: { container: { 'layout-dis-flx': true, 'layout-fd-c': true, 'layout-g-1': true }, label: { 'typography-f-sf': true, 'typography-sz-bm': true, 'color-c-n40': true }, element: { 'layout-p-3': true, 'border-br-8': true, 'border-bw-1': true, 'color-bc-n80': true } },
    MultipleChoice: { container: { 'layout-dis-flx': true, 'layout-fd-c': true, 'layout-g-2': true }, label: { 'typography-f-sf': true, 'typography-sz-bm': true }, element: {} },
    AudioPlayer: { 'layout-w-100': true },
    Video: { 'layout-w-100': true },
    Modal: { backdrop: { 'layout-pos-f': true, 'layout-t-0': true, 'layout-l-0': true, 'layout-w-100vw': true, 'layout-h-100vh': true, 'color-bgc-n0': true, 'opacity-el-50': true }, element: { 'layout-p-4': true, 'border-br-12': true, 'color-bgc-n100': true } },
    Tabs: { element: { 'layout-dis-flx': true, 'layout-fd-c': true, 'layout-g-2': true }, controls: { all: { 'layout-p-2': true }, selected: { 'color-bgc-p90': true, 'border-br-8': true } }, container: { 'layout-dis-flx': true, 'layout-g-2': true } },
  },
  elements: {},
  markdown: {},
  additionalStyles: '',
};

// Theme provider wrapper component
@customElement('a2ui-theme-provider')
class ThemeProvider extends LitElement {
  @provide({ context: UI.Context.themeContext })
  accessor theme: v0_8.Types.Theme = defaultTheme;

  render() {
    return html`<slot></slot>`;
  }
}

/**
 * Convert a ComponentFixture to A2UI server messages.
 */
function fixtureToMessages(
  fixture: ComponentFixture,
  surfaceId: string
): v0_8.Types.ServerToClientMessage[] {
  return [
    {
      surfaceUpdate: {
        surfaceId,
        components: fixture.components.map((c) => ({
          id: c.id,
          component: c.component,
        })),
      },
    } as v0_8.Types.ServerToClientMessage,
    {
      beginRendering: {
        root: fixture.root,
        surfaceId,
      },
    } as v0_8.Types.ServerToClientMessage,
  ];
}

/**
 * Initialize and render the fixture page.
 */
function init() {
  const app = document.getElementById('app')!;
  const params = new URLSearchParams(window.location.search);
  const fixtureName = params.get('fixture') as FixtureName;

  // No fixture specified - show list of available fixtures
  if (!fixtureName || !(fixtureName in allFixtures)) {
    app.innerHTML = `
      <h1>Visual Parity - Lit</h1>
      <p>Available fixtures:</p>
      <ul>
        ${Object.keys(allFixtures)
          .map((name) => `<li><a href="?fixture=${name}">${name}</a></li>`)
          .join('')}
      </ul>
    `;
    return;
  }

  // Create the processor and process messages
  const processor = new v0_8.Data.A2uiMessageProcessor();
  const fixture = allFixtures[fixtureName];
  const surfaceId = `fixture-${fixtureName}`;
  const messages = fixtureToMessages(fixture, surfaceId);

  processor.processMessages(messages);

  // Get the surface data
  const surface = processor.getSurfaces().get(surfaceId);
  if (!surface) {
    app.innerHTML = `<div>Error: Failed to process fixture</div>`;
    return;
  }

  // Create theme provider wrapper
  const themeProvider = document.createElement('a2ui-theme-provider');

  // Create and configure the surface element
  const container = document.createElement('div');
  container.className = 'fixture-container';
  container.setAttribute('data-fixture', fixtureName);

  const surfaceEl = document.createElement('a2ui-surface') as any;
  surfaceEl.surfaceId = surfaceId;
  surfaceEl.surface = surface;
  surfaceEl.processor = processor;

  container.appendChild(surfaceEl);
  themeProvider.appendChild(container);
  app.appendChild(themeProvider);
}

// Run initialization
init();
