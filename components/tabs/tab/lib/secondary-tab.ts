/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {ClassInfo} from 'lit/directives/class-map.js';

import {Tab} from './tab.js';

/** @soyCompatible */
export class SecondaryTab extends Tab {
  /** @soyTemplate */
  protected override getRootClasses(): ClassInfo {
    return {
      ...super.getRootClasses(),
      'md3-tab--secondary': true,
    };
  }
}
