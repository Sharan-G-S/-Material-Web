/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Style preference for leading underscores.
// tslint:disable:strip-private-property-underscore

import {addHasRemoveClass, BaseElement} from '@material/mwc-base/base-element.js';
import {supportsPassiveEventListener} from '@material/mwc-base/utils.js';
import {MDCTopAppBarAdapter} from '@material/top-app-bar/adapter.js';
import {strings} from '@material/top-app-bar/constants.js';
import MDCTopAppBarBaseFoundation from '@material/top-app-bar/foundation.js';
import {html} from 'lit';
import {property, query} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

export const passiveEventOptionsIfSupported =
    supportsPassiveEventListener ? {passive: true} : undefined;

interface ClassInfo {
  [key: string]: boolean;
}

export abstract class TopAppBarBaseBase extends BaseElement {
  protected abstract override mdcFoundation: MDCTopAppBarBaseFoundation;

  protected abstract override mdcFoundationClass:
      typeof MDCTopAppBarBaseFoundation;

  @query('.mdc-top-app-bar') protected mdcRoot!: HTMLElement;

  // _actionItemsSlot should have type HTMLSlotElement, but when TypeScript's
  // emitDecoratorMetadata is enabled, the HTMLSlotElement constructor will
  // be emitted into the runtime, which will cause an "HTMLSlotElement is
  // undefined" error in browsers that don't define it (e.g. IE11).
  @query('slot[name="actionItems"]') protected _actionItemsSlot!: HTMLElement;

  protected _scrollTarget!: HTMLElement|Window;

  @property({type: Boolean}) centerTitle = false;

  @property({type: Object})
  get scrollTarget() {
    return this._scrollTarget || window;
  }

  set scrollTarget(value) {
    this.unregisterScrollListener();
    const old = this.scrollTarget;
    this._scrollTarget = value;
    this.updateRootPosition();
    this.requestUpdate('scrollTarget', old);
    this.registerScrollListener();
  }

  protected updateRootPosition() {
    if (this.mdcRoot) {
      const windowScroller = this.scrollTarget === window;
      // we add support for top-app-bar's tied to an element scroller.
      this.mdcRoot.style.position = windowScroller ? '' : 'absolute';
    }
  }

  /**
   * classMap map for classes on the bar
   */
  protected abstract barClasses(): ClassInfo;

  /**
   * classMap map for classes on the content slot
   */
  protected abstract contentClasses(): ClassInfo;

  protected override render() {
    // clang-format off
    let title = html`<span class="mdc-top-app-bar__title"><slot name="title"></slot></span>`;
    if (this.centerTitle) {
      title = html`<section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-center">${title}</section>`;
    }
    // clang-format on
    return html`
      <header class="mdc-top-app-bar ${classMap(this.barClasses())}">
      <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start" id="navigation">
          <slot name="navigationIcon"
            @click=${this.handleNavigationClick}></slot>
          ${this.centerTitle ? null : title}
        </section>
        ${this.centerTitle ? title : null}
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" id="actions" role="toolbar">
          <slot name="actionItems"></slot>
        </section>
      </div>
    </header>
    <div class="${classMap(this.contentClasses())}">
      <slot></slot>
    </div>
    `;
  }

  protected createAdapter(): MDCTopAppBarAdapter {
    return {
      ...addHasRemoveClass(this.mdcRoot),
      setStyle: (property: string, value: string) =>
          this.mdcRoot.style.setProperty(property, value),
      getTopAppBarHeight: () => this.mdcRoot.clientHeight,
      notifyNavigationIconClicked: () => {
        this.dispatchEvent(new Event(
            strings.NAVIGATION_EVENT, {bubbles: true, cancelable: true}));
      },
      getViewportScrollY: () => this.scrollTarget instanceof Window ?
          this.scrollTarget.pageYOffset :
          this.scrollTarget.scrollTop,
      getTotalActionItems: () => (this._actionItemsSlot as HTMLSlotElement)
                                     .assignedNodes({flatten: true})
                                     .length,
    };
  }

  protected handleTargetScroll = () => {
    this.mdcFoundation.handleTargetScroll();
  };

  protected handleNavigationClick = () => {
    this.mdcFoundation.handleNavigationClick();
  };

  protected registerListeners() {
    this.registerScrollListener();
  }

  protected unregisterListeners() {
    this.unregisterScrollListener();
  }

  protected registerScrollListener() {
    this.scrollTarget.addEventListener(
        'scroll', this.handleTargetScroll, passiveEventOptionsIfSupported);
  }

  protected unregisterScrollListener() {
    this.scrollTarget.removeEventListener('scroll', this.handleTargetScroll);
  }

  protected override firstUpdated() {
    super.firstUpdated();
    this.updateRootPosition();
    this.registerListeners();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.unregisterListeners();
  }
}
