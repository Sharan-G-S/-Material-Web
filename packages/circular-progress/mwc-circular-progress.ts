/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Style preference for leading underscores.
// tslint:disable:strip-private-property-underscore

import {customElement} from 'lit/decorators.js';

import {CircularProgressBase} from './mwc-circular-progress-base.js';
import {styles} from './mwc-circular-progress.css.js';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-circular-progress': CircularProgress;
  }
}

/** @soyCompatible */
@customElement('mwc-circular-progress')
export class CircularProgress extends CircularProgressBase {
  static override styles = [styles];
}
