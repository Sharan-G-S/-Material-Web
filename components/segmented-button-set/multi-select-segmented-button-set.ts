/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {customElement} from 'lit/decorators.js';

import {MultiSelectSegmentedButtonSet} from './lib/multi-select-segmented-button-set.js';
import {styles} from './lib/shared-styles.css.js';

declare global {
  interface HTMLElementTagNameMap {
    'md-multi-select-segmented-button-set': MdMultiSelectSegmentedButtonSet;
  }
}

/**
 * MdMultiSelectSegmentedButtonSet is the custom element for the multi-select
 * behavior of Material Design segmented buttons.
 */
@customElement('md-multi-select-segmented-button-set')
export class MdMultiSelectSegmentedButtonSet extends
    MultiSelectSegmentedButtonSet {
  static override styles = [styles];
}