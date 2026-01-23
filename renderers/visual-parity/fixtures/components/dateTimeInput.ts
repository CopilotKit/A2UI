/**
 * DateTimeInput component fixtures for visual parity testing.
 */

import type { ComponentFixture } from '../types';

export const dateTimeInputDate: ComponentFixture = {
  root: 'dt-date',
  components: [
    {
      id: 'dt-date',
      component: {
        DateTimeInput: {
          label: { literalString: 'Select Date' },
          type: 'date',
        },
      },
    },
  ],
};

export const dateTimeInputTime: ComponentFixture = {
  root: 'dt-time',
  components: [
    {
      id: 'dt-time',
      component: {
        DateTimeInput: {
          label: { literalString: 'Select Time' },
          type: 'time',
        },
      },
    },
  ],
};

export const dateTimeInputBoth: ComponentFixture = {
  root: 'dt-both',
  components: [
    {
      id: 'dt-both',
      component: {
        DateTimeInput: {
          label: { literalString: 'Date and Time' },
          type: 'datetime-local',
        },
      },
    },
  ],
};

export const dateTimeInputFixtures = {
  dateTimeInputDate,
  dateTimeInputTime,
  dateTimeInputBoth,
};
