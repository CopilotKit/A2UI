/**
 * TextField component fixtures for visual parity testing.
 */

import type { ComponentFixture } from '../types';

export const textField: ComponentFixture = {
  root: 'tf-1',
  components: [
    {
      id: 'tf-1',
      component: {
        TextField: { label: { literalString: 'Your Name' } },
      },
    },
  ],
};

export const textFieldWithValue: ComponentFixture = {
  root: 'tf-value',
  components: [
    {
      id: 'tf-value',
      component: {
        TextField: {
          label: { literalString: 'Email' },
          value: { literalString: 'user@example.com' },
        },
      },
    },
  ],
};

export const textFieldMultiline: ComponentFixture = {
  root: 'tf-multi',
  components: [
    {
      id: 'tf-multi',
      component: {
        TextField: {
          label: { literalString: 'Description' },
          multiline: true,
        },
      },
    },
  ],
};

export const textFieldNoLabel: ComponentFixture = {
  root: 'tf-nolabel',
  components: [
    {
      id: 'tf-nolabel',
      component: {
        TextField: {
          value: { literalString: 'No label text field' },
        },
      },
    },
  ],
};

export const textFieldFixtures = {
  textField,
  textFieldWithValue,
  textFieldMultiline,
  textFieldNoLabel,
};
