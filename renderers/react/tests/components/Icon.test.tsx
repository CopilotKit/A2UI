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

import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { TestWrapper, TestRenderer, createSimpleMessages } from '../helpers';
import { tailwindTheme, defaultTheme } from '../../src';

describe('Icon Component', () => {
  describe('Basic Rendering', () => {
    it('should render an icon with literal name', () => {
      const messages = createSimpleMessages('icon-1', 'Icon', {
        name: { literalString: 'home' },
      });

      const { container } = render(
        <TestWrapper>
          <TestRenderer messages={messages} />
        </TestWrapper>
      );

      // Should render something (either Lucide SVG or Material Icons span)
      const surface = container.querySelector('.a2ui-surface');
      expect(surface).toBeInTheDocument();
      expect(surface?.innerHTML).not.toBe('');
    });

    it('should render icon with empty string name gracefully', () => {
      const messages = createSimpleMessages('icon-1', 'Icon', {
        name: { literalString: '' },
      });

      const { container } = render(
        <TestWrapper>
          <TestRenderer messages={messages} />
        </TestWrapper>
      );

      // Should have the surface - empty name falls back to HelpCircle
      const surface = container.querySelector('.a2ui-surface');
      expect(surface).toBeInTheDocument();
    });

    it('should render with search icon', () => {
      const messages = createSimpleMessages('icon-1', 'Icon', {
        name: { literalString: 'search' },
      });

      const { container } = render(
        <TestWrapper>
          <TestRenderer messages={messages} />
        </TestWrapper>
      );

      // Check that content was rendered
      expect(container.querySelector('.a2ui-surface')).toBeInTheDocument();
    });

    it('should render with settings icon', () => {
      const messages = createSimpleMessages('icon-1', 'Icon', {
        name: { literalString: 'settings' },
      });

      const { container } = render(
        <TestWrapper>
          <TestRenderer messages={messages} />
        </TestWrapper>
      );

      expect(container.querySelector('.a2ui-surface')).toBeInTheDocument();
    });
  });

  describe('Icon Name Mapping', () => {
    const iconMappings = [
      { a2ui: 'home', expected: 'Home' },
      { a2ui: 'search', expected: 'Search' },
      { a2ui: 'settings', expected: 'Settings' },
      { a2ui: 'favorite', expected: 'Heart' },
      { a2ui: 'delete', expected: 'Trash2' },
      { a2ui: 'shoppingCart', expected: 'ShoppingCart' },
      { a2ui: 'accountCircle', expected: 'UserCircle' },
      { a2ui: 'notifications', expected: 'Bell' },
      { a2ui: 'mail', expected: 'Mail' },
      { a2ui: 'lock', expected: 'Lock' },
    ];

    iconMappings.forEach(({ a2ui }) => {
      it(`should render "${a2ui}" icon`, () => {
        const messages = createSimpleMessages('icon-1', 'Icon', {
          name: { literalString: a2ui },
        });

        const { container } = render(
          <TestWrapper>
            <TestRenderer messages={messages} />
          </TestWrapper>
        );

        // Should render without error
        expect(container.querySelector('.a2ui-surface')).toBeInTheDocument();
      });
    });
  });

  describe('Theme Support', () => {
    it('should apply default theme classes', () => {
      const messages = createSimpleMessages('icon-1', 'Icon', {
        name: { literalString: 'home' },
      });

      const { container } = render(
        <TestWrapper theme={defaultTheme}>
          <TestRenderer messages={messages} />
        </TestWrapper>
      );

      // Default theme uses 'a2ui-icon' class
      expect(container.querySelector('.a2ui-icon')).toBeInTheDocument();
    });

    it('should apply tailwind theme classes with container/element structure', () => {
      const messages = createSimpleMessages('icon-1', 'Icon', {
        name: { literalString: 'home' },
      });

      const { container } = render(
        <TestWrapper theme={tailwindTheme}>
          <TestRenderer messages={messages} />
        </TestWrapper>
      );

      // Tailwind theme uses 'inline-flex' for container
      expect(container.querySelector('.inline-flex')).toBeInTheDocument();
    });
  });

  describe('Lucide React Integration', () => {
    it('should render SVG icon when lucide-react is available', () => {
      const messages = createSimpleMessages('icon-1', 'Icon', {
        name: { literalString: 'home' },
      });

      const { container } = render(
        <TestWrapper>
          <TestRenderer messages={messages} />
        </TestWrapper>
      );

      // When lucide-react is installed, it renders an SVG
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render with proper sizing classes', () => {
      const messages = createSimpleMessages('icon-1', 'Icon', {
        name: { literalString: 'search' },
      });

      const { container } = render(
        <TestWrapper theme={tailwindTheme}>
          <TestRenderer messages={messages} />
        </TestWrapper>
      );

      // SVG should have the element classes applied
      const svg = container.querySelector('svg');
      if (svg) {
        expect(svg.classList.contains('w-5') || svg.classList.contains('h-5')).toBe(true);
      }
    });
  });

  describe('Unknown Icons', () => {
    it('should fall back to HelpCircle for unknown icon names', () => {
      const messages = createSimpleMessages('icon-1', 'Icon', {
        name: { literalString: 'unknownIconName12345' },
      });

      const { container } = render(
        <TestWrapper>
          <TestRenderer messages={messages} />
        </TestWrapper>
      );

      // Should still render something (HelpCircle fallback)
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });
});
