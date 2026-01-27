import { v0_8 } from '@a2ui/lit';
import * as UI from '@a2ui/lit/ui';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { allFixtures, type FixtureName, type ComponentFixture } from '../../fixtures';
import { getTheme, themeNames, type ThemeName } from '../../fixtures/themes';

// Themed surface component that provides theme context directly
// This matches the pattern from @copilotkit/a2ui-renderer's themed-a2ui-surface
// Key insight: @lit/context doesn't propagate through <slot>, so we must
// provide the theme directly on a component that renders a2ui-surface as a child
@customElement('themed-a2ui-surface')
class ThemedA2UISurface extends LitElement {
  @provide({ context: UI.Context.themeContext })
  @property({ attribute: false })
  accessor theme: v0_8.Types.Theme | undefined = undefined;

  @property({ attribute: false })
  accessor surfaceId: string = '';

  @property({ attribute: false })
  accessor surface: any = undefined;

  @property({ attribute: false })
  accessor processor: any = undefined;

  render() {
    return html`<a2ui-surface
      .surfaceId=${this.surfaceId}
      .surface=${this.surface}
      .processor=${this.processor}
    ></a2ui-surface>`;
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
  const themeName = params.get('theme') as ThemeName | null;

  // Get the selected theme (default to 'lit' since Lit renderer requires a theme)
  const selectedTheme = getTheme(themeName || 'lit');

  // Add theme info to document for debugging
  if (themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
  }

  // Log available themes for debugging
  console.log('[Visual Parity - Lit] Available themes:', themeNames);
  console.log('[Visual Parity - Lit] Selected theme:', themeName || 'default');

  // Default to 'lit' theme if none specified (Lit renderer requires a theme)
  const effectiveTheme = themeName || 'lit';

  // No fixture specified - show list of available fixtures
  if (!fixtureName || !(fixtureName in allFixtures)) {
    app.innerHTML = `
      <h1>Visual Parity - Lit</h1>
      <p>Available fixtures:</p>
      <ul>
        ${Object.keys(allFixtures)
          .map((name) => `<li><a href="?fixture=${name}&theme=${effectiveTheme}">${name}</a></li>`)
          .join('')}
      </ul>
      <h2>Available themes:</h2>
      <ul>
        ${themeNames
          .filter((t) => t !== 'default')
          .map((theme) => `<li><a href="?theme=${theme}">${theme}</a> ${theme === effectiveTheme ? '(current)' : ''}</li>`)
          .join('')}
      </ul>
      <p>Current theme: <strong>${effectiveTheme}</strong></p>
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

  // Create container for fixture
  const container = document.createElement('div');
  container.className = 'fixture-container';
  container.setAttribute('data-fixture', fixtureName);
  if (themeName) {
    container.setAttribute('data-theme', themeName);
  }

  // Create themed surface that provides theme context directly (not through slot)
  const themedSurface = document.createElement('themed-a2ui-surface') as ThemedA2UISurface;
  themedSurface.theme = selectedTheme;
  themedSurface.surfaceId = surfaceId;
  themedSurface.surface = surface;
  themedSurface.processor = processor;

  container.appendChild(themedSurface);
  app.appendChild(container);
}

// Run initialization
init();
