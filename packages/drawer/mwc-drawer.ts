/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Style preference for leading underscores.
// tslint:disable:strip-private-property-underscore

import {customElement} from 'lit/decorators.js';

import {DrawerBase} from './mwc-drawer-base.js';
import {styles} from './mwc-drawer.css.js';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-drawer': Drawer;
  }
}

@customElement('mwc-drawer')
export class Drawer extends DrawerBase {
  static override styles = [styles];
}
