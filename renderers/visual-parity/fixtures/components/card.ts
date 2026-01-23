/**
 * Card component fixtures for visual parity testing.
 */

import type { ComponentFixture } from '../types';

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

export const cardWithImage: ComponentFixture = {
  root: 'card-img',
  components: [
    {
      id: 'card-img-image',
      component: {
        Image: {
          src: { literalString: 'https://via.placeholder.com/300x150/6366f1/ffffff?text=Card+Image' },
          usageHint: 'header',
        },
      },
    },
    {
      id: 'card-img-title',
      component: {
        Text: { text: { literalString: 'Card with Image' }, usageHint: 'h2' },
      },
    },
    {
      id: 'card-img-body',
      component: {
        Text: { text: { literalString: 'This card has a header image above the title.' } },
      },
    },
    {
      id: 'card-img',
      component: {
        Card: { children: ['card-img-image', 'card-img-title', 'card-img-body'] },
      },
    },
  ],
};

export const cardComplex: ComponentFixture = {
  root: 'card-complex',
  components: [
    {
      id: 'card-complex-avatar',
      component: {
        Image: {
          src: { literalString: 'https://via.placeholder.com/48/6366f1/ffffff?text=A' },
          usageHint: 'avatar',
        },
      },
    },
    {
      id: 'card-complex-name',
      component: {
        Text: { text: { literalString: 'John Doe' }, usageHint: 'h3' },
      },
    },
    {
      id: 'card-complex-role',
      component: {
        Text: { text: { literalString: 'Software Engineer' }, usageHint: 'caption' },
      },
    },
    {
      id: 'card-complex-info',
      component: {
        Column: { children: ['card-complex-name', 'card-complex-role'] },
      },
    },
    {
      id: 'card-complex-header',
      component: {
        Row: { children: ['card-complex-avatar', 'card-complex-info'] },
      },
    },
    {
      id: 'card-complex-divider',
      component: {
        Divider: {},
      },
    },
    {
      id: 'card-complex-body',
      component: {
        Text: { text: { literalString: 'Building amazing user interfaces with A2UI.' } },
      },
    },
    {
      id: 'card-complex',
      component: {
        Card: { children: ['card-complex-header', 'card-complex-divider', 'card-complex-body'] },
      },
    },
  ],
};

export const cardFixtures = {
  card,
  cardWithImage,
  cardComplex,
};
