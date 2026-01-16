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

import type { Types } from '@a2ui/lit/0.8';

/**
 * Default theme for A2UI React components.
 *
 * This theme uses BEM-style class names prefixed with `a2ui-`.
 * Consumers can provide their own CSS targeting these classes,
 * or import the optional structural.css preset.
 */
export const defaultTheme: Types.Theme = {
  components: {
    AudioPlayer: { 'a2ui-audio-player': true },
    Button: { 'a2ui-button': true },
    Card: { 'a2ui-card': true },
    Column: { 'a2ui-column': true },
    CheckBox: {
      container: { 'a2ui-checkbox': true },
      element: { 'a2ui-checkbox__input': true },
      label: { 'a2ui-checkbox__label': true },
    },
    DateTimeInput: {
      container: { 'a2ui-datetime-input': true },
      element: { 'a2ui-datetime-input__input': true },
      label: { 'a2ui-datetime-input__label': true },
    },
    Divider: { 'a2ui-divider': true },
    Image: {
      all: { 'a2ui-image': true },
      icon: { 'a2ui-image': true, 'a2ui-image--icon': true },
      avatar: { 'a2ui-image': true, 'a2ui-image--avatar': true },
      smallFeature: { 'a2ui-image': true, 'a2ui-image--small-feature': true },
      mediumFeature: { 'a2ui-image': true, 'a2ui-image--medium-feature': true },
      largeFeature: { 'a2ui-image': true, 'a2ui-image--large-feature': true },
      header: { 'a2ui-image': true, 'a2ui-image--header': true },
    },
    Icon: { 'a2ui-icon': true },
    List: { 'a2ui-list': true },
    Modal: {
      backdrop: { 'a2ui-modal__backdrop': true },
      element: { 'a2ui-modal': true },
    },
    MultipleChoice: {
      container: { 'a2ui-multiple-choice': true },
      element: { 'a2ui-multiple-choice__option': true },
      label: { 'a2ui-multiple-choice__label': true },
    },
    Row: { 'a2ui-row': true },
    Slider: {
      container: { 'a2ui-slider': true },
      element: { 'a2ui-slider__input': true },
      label: { 'a2ui-slider__label': true },
    },
    Tabs: {
      container: { 'a2ui-tabs': true },
      element: { 'a2ui-tabs__panel': true },
      controls: {
        all: { 'a2ui-tabs__tab': true },
        selected: { 'a2ui-tabs__tab': true, 'a2ui-tabs__tab--selected': true },
      },
    },
    Text: {
      all: { 'a2ui-text': true },
      h1: { 'a2ui-text': true, 'a2ui-text--h1': true },
      h2: { 'a2ui-text': true, 'a2ui-text--h2': true },
      h3: { 'a2ui-text': true, 'a2ui-text--h3': true },
      h4: { 'a2ui-text': true, 'a2ui-text--h4': true },
      h5: { 'a2ui-text': true, 'a2ui-text--h5': true },
      caption: { 'a2ui-text': true, 'a2ui-text--caption': true },
      body: { 'a2ui-text': true, 'a2ui-text--body': true },
    },
    TextField: {
      container: { 'a2ui-text-field': true },
      element: { 'a2ui-text-field__input': true },
      label: { 'a2ui-text-field__label': true },
    },
    Video: { 'a2ui-video': true },
  },
  elements: {
    a: { 'a2ui-link': true },
    audio: { 'a2ui-audio': true },
    body: { 'a2ui-body': true },
    button: { 'a2ui-button-element': true },
    h1: { 'a2ui-h1': true },
    h2: { 'a2ui-h2': true },
    h3: { 'a2ui-h3': true },
    h4: { 'a2ui-h4': true },
    h5: { 'a2ui-h5': true },
    iframe: { 'a2ui-iframe': true },
    input: { 'a2ui-input': true },
    p: { 'a2ui-p': true },
    pre: { 'a2ui-pre': true },
    textarea: { 'a2ui-textarea': true },
    video: { 'a2ui-video-element': true },
  },
  markdown: {
    p: ['a2ui-md-p'],
    h1: ['a2ui-md-h1'],
    h2: ['a2ui-md-h2'],
    h3: ['a2ui-md-h3'],
    h4: ['a2ui-md-h4'],
    h5: ['a2ui-md-h5'],
    ul: ['a2ui-md-ul'],
    ol: ['a2ui-md-ol'],
    li: ['a2ui-md-li'],
    a: ['a2ui-md-a'],
    strong: ['a2ui-md-strong'],
    em: ['a2ui-md-em'],
  },
};
