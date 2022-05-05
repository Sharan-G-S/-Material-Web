/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Style preference for leading underscores.
// tslint:disable:strip-private-property-underscore

import {customElement} from 'lit/decorators.js';

import {SnackbarBase} from './mwc-snackbar-base.js';
import {styles} from './mwc-snackbar.css.js';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-snackbar': Snackbar;
  }
}

@customElement('mwc-snackbar')
export class Snackbar extends SnackbarBase {
  static override styles = [styles];
}
