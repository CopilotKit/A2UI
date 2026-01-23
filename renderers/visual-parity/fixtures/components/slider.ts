/**
 * Slider component fixtures for visual parity testing.
 */

import type { ComponentFixture } from '../types';

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

export const sliderWithLabel: ComponentFixture = {
  root: 'slider-label',
  components: [
    {
      id: 'slider-label',
      component: {
        Slider: {
          label: { literalString: 'Volume' },
          value: { literalNumber: 75 },
        },
      },
    },
  ],
};

export const sliderRange: ComponentFixture = {
  root: 'slider-range',
  components: [
    {
      id: 'slider-range',
      component: {
        Slider: {
          label: { literalString: 'Temperature' },
          value: { literalNumber: 22 },
          min: { literalNumber: 16 },
          max: { literalNumber: 30 },
        },
      },
    },
  ],
};

export const sliderFixtures = {
  slider,
  sliderWithLabel,
  sliderRange,
};
