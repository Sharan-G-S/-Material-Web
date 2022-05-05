/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Style preference for leading underscores.
// tslint:disable:strip-private-property-underscore

import {customElement} from 'lit/decorators.js';

import {FormfieldBase} from './mwc-formfield-base.js';
import {styles} from './mwc-formfield.css.js';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-formfield': Formfield;
  }
}

@customElement('mwc-formfield')
export class Formfield extends FormfieldBase {
  static override styles = [styles];
}
