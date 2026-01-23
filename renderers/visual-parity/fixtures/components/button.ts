/**
 * Button component fixtures for visual parity testing.
 */

import type { ComponentFixture } from '../types';

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

export const buttonWithIcon: ComponentFixture = {
  root: 'btn-icon',
  components: [
    {
      id: 'btn-icon-icon',
      component: {
        Icon: { name: { literalString: 'add' } },
      },
    },
    {
      id: 'btn-icon-text',
      component: {
        Text: { text: { literalString: 'Add Item' } },
      },
    },
    {
      id: 'btn-icon-row',
      component: {
        Row: { children: ['btn-icon-icon', 'btn-icon-text'] },
      },
    },
    {
      id: 'btn-icon',
      component: {
        Button: { child: 'btn-icon-row', action: { name: 'add' }, primary: true },
      },
    },
  ],
};

export const buttonDisabled: ComponentFixture = {
  root: 'btn-disabled',
  components: [
    {
      id: 'btn-disabled-text',
      component: {
        Text: { text: { literalString: 'Disabled Button' } },
      },
    },
    {
      id: 'btn-disabled',
      component: {
        Button: { child: 'btn-disabled-text', action: { name: 'disabled' }, disabled: true },
      },
    },
  ],
};

export const buttonFixtures = {
  buttonPrimary,
  buttonSecondary,
  buttonWithIcon,
  buttonDisabled,
};
