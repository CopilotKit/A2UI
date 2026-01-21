import React, { useEffect, useState } from 'react';
import { useA2UI, A2UIRenderer } from '@a2ui/react';
import type { Types } from '@a2ui/lit/0.8';
import { allFixtures, type FixtureName, type ComponentFixture } from '../../fixtures';

/**
 * Convert a ComponentFixture to A2UI server messages.
 */
function fixtureToMessages(
  fixture: ComponentFixture,
  surfaceId: string
): Types.ServerToClientMessage[] {
  return [
    {
      surfaceUpdate: {
        surfaceId,
        components: fixture.components.map((c) => ({
          id: c.id,
          component: c.component,
        })),
      },
    } as Types.ServerToClientMessage,
    {
      beginRendering: {
        root: fixture.root,
        surfaceId,
      },
    } as Types.ServerToClientMessage,
  ];
}

export function FixturePage() {
  const { processMessages } = useA2UI();
  const [fixtureName, setFixtureName] = useState<FixtureName | null>(null);
  const [ready, setReady] = useState(false);

  // Get fixture name from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get('fixture') as FixtureName;
    if (name && name in allFixtures) {
      setFixtureName(name);
    }
  }, []);

  // Process fixture messages when fixture name changes
  useEffect(() => {
    if (!fixtureName) return;

    const fixture = allFixtures[fixtureName];
    const surfaceId = `fixture-${fixtureName}`;
    const messages = fixtureToMessages(fixture, surfaceId);

    processMessages(messages);
    setReady(true);
  }, [fixtureName, processMessages]);

  // No fixture specified - show list of available fixtures
  if (!fixtureName) {
    return (
      <div>
        <h1>Visual Parity - React</h1>
        <p>Available fixtures:</p>
        <ul>
          {Object.keys(allFixtures).map((name) => (
            <li key={name}>
              <a href={`?fixture=${name}`}>{name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Loading
  if (!ready) {
    return <div>Loading...</div>;
  }

  // Render the fixture
  const surfaceId = `fixture-${fixtureName}`;
  return (
    <div className="fixture-container" data-fixture={fixtureName}>
      <A2UIRenderer surfaceId={surfaceId} />
    </div>
  );
}
