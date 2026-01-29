/**
 * Image component fixtures for visual parity testing.
 *
 * TODO: Add real test images to react/public/ and lit/public/ folders
 * and update these URLs to use /test-image.png format.
 */

import type { ComponentFixture } from '../types';

// Placeholder URLs - replace with local images in public/ folders
const placeholderUrl = 'https://via.placeholder.com/150/6366f1/ffffff?text=A2UI';
const avatarUrl = 'https://via.placeholder.com/64/6366f1/ffffff?text=U';
const largeUrl = 'https://via.placeholder.com/400x200/6366f1/ffffff?text=Large';

export const imageBasic: ComponentFixture = {
  root: 'img-basic',
  components: [
    {
      id: 'img-basic',
      component: {
        Image: { url: { literalString: placeholderUrl } },
      },
    },
  ],
};

export const imageAvatar: ComponentFixture = {
  root: 'img-avatar',
  components: [
    {
      id: 'img-avatar',
      component: {
        Image: {
          url: { literalString: avatarUrl },
          usageHint: 'avatar',
        },
      },
    },
  ],
};

export const imageHeader: ComponentFixture = {
  root: 'img-header',
  components: [
    {
      id: 'img-header',
      component: {
        Image: {
          url: { literalString: largeUrl },
          usageHint: 'header',
        },
      },
    },
  ],
};

export const imageIcon: ComponentFixture = {
  root: 'img-icon',
  components: [
    {
      id: 'img-icon',
      component: {
        Image: {
          url: { literalString: avatarUrl },
          usageHint: 'icon',
        },
      },
    },
  ],
};

export const imageLargeFeature: ComponentFixture = {
  root: 'img-large',
  components: [
    {
      id: 'img-large',
      component: {
        Image: {
          url: { literalString: largeUrl },
          usageHint: 'largeFeature',
        },
      },
    },
  ],
};

export const imageMediumFeature: ComponentFixture = {
  root: 'img-medium',
  components: [
    {
      id: 'img-medium',
      component: {
        Image: {
          url: { literalString: placeholderUrl },
          usageHint: 'mediumFeature',
        },
      },
    },
  ],
};

export const imageSmallFeature: ComponentFixture = {
  root: 'img-small',
  components: [
    {
      id: 'img-small',
      component: {
        Image: {
          url: { literalString: avatarUrl },
          usageHint: 'smallFeature',
        },
      },
    },
  ],
};

export const imageFixtures = {
  imageBasic,
  imageAvatar,
  imageHeader,
  imageIcon,
  imageLargeFeature,
  imageMediumFeature,
  imageSmallFeature,
};
