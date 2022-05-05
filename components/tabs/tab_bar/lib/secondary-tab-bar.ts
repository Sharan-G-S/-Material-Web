/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {ClassInfo} from 'lit/directives/class-map.js';

import {SecondaryTab} from '../../tab/lib/secondary-tab.js';

import {TabBar} from './tab-bar.js';

/** @soyCompatible */
export class SecondaryTabBar extends TabBar {
  /** @soyTemplate */
  protected override getRootClasses(): ClassInfo {
    return {
      ...super.getRootClasses(),
      'md3-tab-bar--secondary': true,
    };
  }

  // TODO(sorvell): probably want to memoize this and use a `slotChange` event
  protected getTabs() {
    return (this.tabsSlot as HTMLSlotElement)
               .assignedNodes({flatten: true})
               .filter((e: Node) => e instanceof SecondaryTab) as
        SecondaryTab[];
  }

  protected getActiveTabIndex() {
    const tabElements = this.getTabs();
    const activeElement =
        (this.getRootNode() as ShadowRoot).activeElement as SecondaryTab;
    return tabElements.indexOf(activeElement);
  }
}
