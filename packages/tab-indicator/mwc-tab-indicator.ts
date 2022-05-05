/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Style preference for leading underscores.
// tslint:disable:strip-private-property-underscore

import {customElement} from 'lit/decorators.js';

import {TabIndicatorBase} from './mwc-tab-indicator-base.js';
import {styles} from './mwc-tab-indicator.css.js';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-tab-indicator': TabIndicator;
  }
}

@customElement('mwc-tab-indicator')
export class TabIndicator extends TabIndicatorBase {
  static override styles = [styles];
}
