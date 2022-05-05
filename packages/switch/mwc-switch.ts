/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {customElement} from 'lit/decorators.js';

import {SwitchBase} from './mwc-switch-base.js';
import {styles} from './styles.css.js';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-switch': Switch;
  }
}

/** @soyCompatible */
@customElement('mwc-switch')
export class Switch extends SwitchBase {
  static override styles = [styles];
}
