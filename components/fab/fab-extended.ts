/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {customElement} from 'lit/decorators.js';

import {styles as overlayStyles} from '../elevation/lib/elevation-overlay-styles.css.js';

import {FabExtended} from './lib/fab-extended.js';
import {styles as extendedStyles} from './lib/fab-extended-styles.css.js';
import {styles as sharedStyles} from './lib/fab-shared-styles.css.js';

declare global {
  interface HTMLElementTagNameMap {
    'm3-fab-extended': MdFabExtended;
  }
}

/**
 * @soyCompatible
 * @final
 * @suppress {visibility}
 */
@customElement('m3-fab-extended')
export class MdFabExtended extends FabExtended {
  static override styles = [overlayStyles, sharedStyles, extendedStyles];
}
