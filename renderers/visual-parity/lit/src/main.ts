import { v0_8 } from '@a2ui/lit';
import * as UI from '@a2ui/lit/ui';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { allFixtures, type FixtureName, type ComponentFixture } from '../../fixtures';
import { visualParityTheme } from '../../fixtures/theme';

// Inject structural styles
const styleEl = document.createElement('style');
styleEl.textContent = v0_8.Styles.structuralStyles;
document.head.appendChild(styleEl);

// Theme provider wrapper component
@customElement('a2ui-theme-provider')
class ThemeProvider extends LitElement {
  @provide({ context: UI.Context.themeContext })
  accessor theme: v0_8.Types.Theme = visualParityTheme;

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
