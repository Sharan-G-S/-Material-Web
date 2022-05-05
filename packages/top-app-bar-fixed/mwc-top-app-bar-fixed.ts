/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Style preference for leading underscores.
// tslint:disable:strip-private-property-underscore

import {customElement} from 'lit/decorators.js';

import {styles} from '@material/mwc-top-app-bar/mwc-top-app-bar.css.js';

import {TopAppBarFixedBase} from './mwc-top-app-bar-fixed-base.js';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-top-app-bar-fixed': TopAppBarFixed;
  }
}

@customElement('mwc-top-app-bar-fixed')
export class TopAppBarFixed extends TopAppBarFixedBase {
  static override styles = [styles];
}
