/**
 * Nested layout fixtures for visual parity testing.
 * Tests complex compositions of multiple components.
 */

import type { ComponentFixture } from '../types';

export const nestedCardInList: ComponentFixture = {
  root: 'nested-card-list',
  components: [
    // Card 1
    { id: 'n-card1-icon', component: { Icon: { name: { literalString: 'folder' } } } },
    { id: 'n-card1-title', component: { Text: { text: { literalString: 'Documents' }, usageHint: 'h3' } } },
    { id: 'n-card1-count', component: { Text: { text: { literalString: '24 files' }, usageHint: 'caption' } } },
    { id: 'n-card1-header', component: { Row: { children: ['n-card1-icon', 'n-card1-title'] } } },
    { id: 'n-card1', component: { Card: { children: ['n-card1-header', 'n-card1-count'] } } },
    // Card 2
    { id: 'n-card2-icon', component: { Icon: { name: { literalString: 'image' } } } },
    { id: 'n-card2-title', component: { Text: { text: { literalString: 'Photos' }, usageHint: 'h3' } } },
    { id: 'n-card2-count', component: { Text: { text: { literalString: '156 images' }, usageHint: 'caption' } } },
    { id: 'n-card2-header', component: { Row: { children: ['n-card2-icon', 'n-card2-title'] } } },
    { id: 'n-card2', component: { Card: { children: ['n-card2-header', 'n-card2-count'] } } },
    // List
    { id: 'nested-card-list', component: { List: { children: ['n-card1', 'n-card2'] } } },
  ],
};

export const nestedForm: ComponentFixture = {
  root: 'nested-form',
  components: [
    // Form header
    { id: 'form-title', component: { Text: { text: { literalString: 'Contact Form' }, usageHint: 'h2' } } },
    { id: 'form-subtitle', component: { Text: { text: { literalString: 'Fill out the form below' }, usageHint: 'caption' } } },
    // Form fields
    { id: 'form-name', component: { TextField: { label: { literalString: 'Name' } } } },
    { id: 'form-email', component: { TextField: { label: { literalString: 'Email' } } } },
    { id: 'form-message', component: { TextField: { label: { literalString: 'Message' }, multiline: true } } },
    // Submit button
    { id: 'form-btn-text', component: { Text: { text: { literalString: 'Submit' } } } },
    { id: 'form-btn', component: { Button: { child: 'form-btn-text', action: { name: 'submit' }, primary: true } } },
    // Card wrapper
    {
      id: 'nested-form',
      component: {
        Card: { children: ['form-title', 'form-subtitle', 'form-name', 'form-email', 'form-message', 'form-btn'] },
      },
    },
  ],
};

export const nestedRowInColumn: ComponentFixture = {
  root: 'nested-row-col',
  components: [
    // Row 1
    { id: 'r1-t1', component: { Text: { text: { literalString: 'A1' } } } },
    { id: 'r1-t2', component: { Text: { text: { literalString: 'A2' } } } },
    { id: 'r1-t3', component: { Text: { text: { literalString: 'A3' } } } },
    { id: 'row1', component: { Row: { children: ['r1-t1', 'r1-t2', 'r1-t3'] } } },
    // Row 2
    { id: 'r2-t1', component: { Text: { text: { literalString: 'B1' } } } },
    { id: 'r2-t2', component: { Text: { text: { literalString: 'B2' } } } },
    { id: 'r2-t3', component: { Text: { text: { literalString: 'B3' } } } },
    { id: 'row2', component: { Row: { children: ['r2-t1', 'r2-t2', 'r2-t3'] } } },
    // Row 3
    { id: 'r3-t1', component: { Text: { text: { literalString: 'C1' } } } },
    { id: 'r3-t2', component: { Text: { text: { literalString: 'C2' } } } },
    { id: 'r3-t3', component: { Text: { text: { literalString: 'C3' } } } },
    { id: 'row3', component: { Row: { children: ['r3-t1', 'r3-t2', 'r3-t3'] } } },
    // Column
    { id: 'nested-row-col', component: { Column: { children: ['row1', 'row2', 'row3'] } } },
  ],
};

export const nestedColumnInRow: ComponentFixture = {
  root: 'nested-col-row',
  components: [
    // Column 1
    { id: 'c1-t1', component: { Text: { text: { literalString: 'Col 1 - A' } } } },
    { id: 'c1-t2', component: { Text: { text: { literalString: 'Col 1 - B' } } } },
    { id: 'col1', component: { Column: { children: ['c1-t1', 'c1-t2'] } } },
    // Column 2
    { id: 'c2-t1', component: { Text: { text: { literalString: 'Col 2 - A' } } } },
    { id: 'c2-t2', component: { Text: { text: { literalString: 'Col 2 - B' } } } },
    { id: 'col2', component: { Column: { children: ['c2-t1', 'c2-t2'] } } },
    // Column 3
    { id: 'c3-t1', component: { Text: { text: { literalString: 'Col 3 - A' } } } },
    { id: 'c3-t2', component: { Text: { text: { literalString: 'Col 3 - B' } } } },
    { id: 'col3', component: { Column: { children: ['c3-t1', 'c3-t2'] } } },
    // Row
    { id: 'nested-col-row', component: { Row: { children: ['col1', 'col2', 'col3'] } } },
  ],
};

export const nestedDashboard: ComponentFixture = {
  root: 'nested-dashboard',
  components: [
    // Header
    { id: 'dash-title', component: { Text: { text: { literalString: 'Dashboard' }, usageHint: 'h1' } } },
    { id: 'dash-icon', component: { Icon: { name: { literalString: 'dashboard' } } } },
    { id: 'dash-header', component: { Row: { children: ['dash-icon', 'dash-title'] } } },
    // Stats cards
    { id: 'stat1-val', component: { Text: { text: { literalString: '1,234' }, usageHint: 'h2' } } },
    { id: 'stat1-label', component: { Text: { text: { literalString: 'Users' }, usageHint: 'caption' } } },
    { id: 'stat1', component: { Card: { children: ['stat1-val', 'stat1-label'] } } },
    { id: 'stat2-val', component: { Text: { text: { literalString: '567' }, usageHint: 'h2' } } },
    { id: 'stat2-label', component: { Text: { text: { literalString: 'Orders' }, usageHint: 'caption' } } },
    { id: 'stat2', component: { Card: { children: ['stat2-val', 'stat2-label'] } } },
    { id: 'stat3-val', component: { Text: { text: { literalString: '$12,345' }, usageHint: 'h2' } } },
    { id: 'stat3-label', component: { Text: { text: { literalString: 'Revenue' }, usageHint: 'caption' } } },
    { id: 'stat3', component: { Card: { children: ['stat3-val', 'stat3-label'] } } },
    { id: 'stats-row', component: { Row: { children: ['stat1', 'stat2', 'stat3'] } } },
    // Main layout
    { id: 'nested-dashboard', component: { Column: { children: ['dash-header', 'stats-row'] } } },
  ],
};

export const nestedProfile: ComponentFixture = {
  root: 'nested-profile',
  components: [
    // Avatar and info
    { id: 'profile-avatar', component: { Image: { src: { literalString: 'https://via.placeholder.com/80/6366f1/ffffff?text=JD' }, usageHint: 'avatar' } } },
    { id: 'profile-name', component: { Text: { text: { literalString: 'Jane Doe' }, usageHint: 'h2' } } },
    { id: 'profile-role', component: { Text: { text: { literalString: 'Product Designer' }, usageHint: 'caption' } } },
    { id: 'profile-info', component: { Column: { children: ['profile-name', 'profile-role'] } } },
    { id: 'profile-header', component: { Row: { children: ['profile-avatar', 'profile-info'] } } },
    // Divider
    { id: 'profile-divider', component: { Divider: {} } },
    // Bio
    { id: 'bio-title', component: { Text: { text: { literalString: 'About' }, usageHint: 'h3' } } },
    { id: 'bio-text', component: { Text: { text: { literalString: 'Passionate about creating beautiful and functional user interfaces. 5+ years of experience in UI/UX design.' } } } },
    // Contact info
    { id: 'contact-title', component: { Text: { text: { literalString: 'Contact' }, usageHint: 'h3' } } },
    { id: 'contact-email-icon', component: { Icon: { name: { literalString: 'mail' } } } },
    { id: 'contact-email-text', component: { Text: { text: { literalString: 'jane@example.com' } } } },
    { id: 'contact-email', component: { Row: { children: ['contact-email-icon', 'contact-email-text'] } } },
    // Card
    {
      id: 'nested-profile',
      component: {
        Card: { children: ['profile-header', 'profile-divider', 'bio-title', 'bio-text', 'contact-title', 'contact-email'] },
      },
    },
  ],
};

export const nestedSettings: ComponentFixture = {
  root: 'nested-settings',
  components: [
    // Header
    { id: 'settings-title', component: { Text: { text: { literalString: 'Settings' }, usageHint: 'h2' } } },
    // Preferences section
    { id: 'pref-title', component: { Text: { text: { literalString: 'Preferences' }, usageHint: 'h3' } } },
    { id: 'pref-notify', component: { CheckBox: { label: { literalString: 'Enable notifications' }, value: { literalBoolean: true } } } },
    { id: 'pref-dark', component: { CheckBox: { label: { literalString: 'Dark mode' }, value: { literalBoolean: false } } } },
    { id: 'pref-auto', component: { CheckBox: { label: { literalString: 'Auto-update' }, value: { literalBoolean: true } } } },
    { id: 'pref-section', component: { Column: { children: ['pref-title', 'pref-notify', 'pref-dark', 'pref-auto'] } } },
    // Volume slider
    { id: 'vol-slider', component: { Slider: { label: { literalString: 'Volume' }, value: { literalNumber: 60 } } } },
    // Divider
    { id: 'settings-div', component: { Divider: {} } },
    // Buttons
    { id: 'save-btn-text', component: { Text: { text: { literalString: 'Save' } } } },
    { id: 'save-btn', component: { Button: { child: 'save-btn-text', action: { name: 'save' }, primary: true } } },
    { id: 'cancel-btn-text', component: { Text: { text: { literalString: 'Cancel' } } } },
    { id: 'cancel-btn', component: { Button: { child: 'cancel-btn-text', action: { name: 'cancel' }, primary: false } } },
    { id: 'btn-row', component: { Row: { children: ['save-btn', 'cancel-btn'] } } },
    // Card wrapper
    {
      id: 'nested-settings',
      component: {
        Card: { children: ['settings-title', 'pref-section', 'vol-slider', 'settings-div', 'btn-row'] },
      },
    },
  ],
};

export const nestedFixtures = {
  nestedCardInList,
  nestedForm,
  nestedRowInColumn,
  nestedColumnInRow,
  nestedDashboard,
  nestedProfile,
  nestedSettings,
};
