/**
 * CheckBox component fixtures for visual parity testing.
 */

import type { ComponentFixture } from '../types';

export const checkboxUnchecked: ComponentFixture = {
  root: 'cb-1',
  components: [
    {
      id: 'cb-1',
      component: {
        CheckBox: {
          label: { literalString: 'Unchecked option' },
          value: { literalBoolean: false },
        },
      },
    },
  ],
};

export const checkboxChecked: ComponentFixture = {
  root: 'cb-2',
  components: [
    {
      id: 'cb-2',
      component: {
        CheckBox: {
          label: { literalString: 'Checked option' },
          value: { literalBoolean: true },
        },
      },
    },
  ],
};

export const checkboxLongLabel: ComponentFixture = {
  root: 'cb-long',
  components: [
    {
      id: 'cb-long',
      component: {
        CheckBox: {
          label: { literalString: 'I agree to the terms and conditions of service and privacy policy' },
          value: { literalBoolean: false },
        },
      },
    },
  ],
};

export const checkboxFixtures = {
  checkboxUnchecked,
  checkboxChecked,
  checkboxLongLabel,
};
