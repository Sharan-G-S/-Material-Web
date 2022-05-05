/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Style preference for leading underscores.
// tslint:disable:strip-private-property-underscore


import '@material/mwc-ripple/mwc-ripple.js';

import {observer} from '@material/mwc-base/observer.js';
import {Ripple} from '@material/mwc-ripple/mwc-ripple.js';
import {RippleHandlers} from '@material/mwc-ripple/ripple-handlers.js';
import {html, LitElement} from 'lit';
import {property, query, queryAsync, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';

export type SelectionSource = 'interaction'|'property';
export interface RequestSelectedDetail {
  selected: boolean;
  source: SelectionSource;
}

export interface Layoutable {
  layout: (updateItems?: boolean) => void;
  debouncedLayout?: (updateItems?: boolean) => void | undefined;
}

export type GraphicType = 'avatar'|'icon'|'medium'|'large'|'control'|null;

/**
 * @fires request-selected {RequestSelectedDetail}
 * @fires list-item-rendered
 */
export class ListItemBase extends LitElement {
  @query('slot') protected slotElement!: HTMLSlotElement|null;
  @queryAsync('mwc-ripple') ripple!: Promise<Ripple|null>;

  @property({type: String}) value = '';
  @property({type: String, reflect: true}) group: string|null = null;
  @property({type: Number, reflect: true}) tabindex = -1;
  @property({type: Boolean, reflect: true})
  @observer(function(this: ListItemBase, value: boolean) {
    if (value) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.setAttribute('aria-disabled', 'false');
    }
  })
  disabled = false;
  @property({type: Boolean, reflect: true}) twoline = false;
  @property({type: Boolean, reflect: true}) activated = false;
  @property({type: String, reflect: true}) graphic: GraphicType = null;
  @property({type: Boolean}) multipleGraphics = false;
  @property({type: Boolean}) hasMeta = false;
  @property({type: Boolean, reflect: true})
  @observer(function(this: ListItemBase, value: boolean) {
    if (value) {
      this.removeAttribute('aria-checked');
      this.removeAttribute('mwc-list-item');
      this.selected = false;
      this.activated = false;
      this.tabIndex = -1;
    } else {
      this.setAttribute('mwc-list-item', '');
    }
  })
  noninteractive = false;
  @property({type: Boolean, reflect: true})
  @observer(function(this: ListItemBase, value: boolean) {
    const role = this.getAttribute('role');
    const isAriaSelectable = role === 'gridcell' || role === 'option' ||
        role === 'row' || role === 'tab';

    if (isAriaSelectable && value) {
      this.setAttribute('aria-selected', 'true');
    } else if (isAriaSelectable) {
      this.setAttribute('aria-selected', 'false');
    }

    if (this._firstChanged) {
      this._firstChanged = false;
      return;
    }

    if (this._skipPropRequest) {
      return;
    }

    this.fireRequestSelected(value, 'property');
  })
  selected = false;

  @state() protected shouldRenderRipple = false;
  @state() _managingList: Layoutable|null = null;

  protected boundOnClick = this.onClick.bind(this);
  protected _firstChanged = true;
  protected _skipPropRequest = false;
  protected rippleHandlers: RippleHandlers = new RippleHandlers(() => {
    this.shouldRenderRipple = true;
    return this.ripple;
  });
  protected listeners: ({
    target: Element;
    eventNames: string[];
    cb: EventListenerOrEventListenerObject;
  })[] =
      [
        {
          target: this,
          eventNames: ['click'],
          cb:
              () => {
                this.onClick();
              },
        },
        {
          target: this,
          eventNames: ['mouseenter'],
          cb: this.rippleHandlers.startHover,
        },
        {
          target: this,
          eventNames: ['mouseleave'],
          cb: this.rippleHandlers.endHover,
        },
        {
          target: this,
          eventNames: ['focus'],
          cb: this.rippleHandlers.startFocus,
        },
        {
          target: this,
          eventNames: ['blur'],
          cb: this.rippleHandlers.endFocus,
        },
        {
          target: this,
          eventNames: ['mousedown', 'touchstart'],
          cb:
              (e: Event) => {
                const name = e.type;
                this.onDown(name === 'mousedown' ? 'mouseup' : 'touchend', e);
              },
        },
      ];

  get text() {
    const textContent = this.textContent;

    return textContent ? textContent.trim() : '';
  }

  override render() {
    const text = this.renderText();
    const graphic = this.graphic ? this.renderGraphic() : html``;
    const meta = this.hasMeta ? this.renderMeta() : html``;

    return html`
      ${this.renderRipple()}
      ${graphic}
      ${text}
      ${meta}`;
  }

  protected renderRipple() {
    if (this.shouldRenderRipple) {
      return html`
      <mwc-ripple
        .activated=${this.activated}>
      </mwc-ripple>`;
    } else if (this.activated) {
      return html`<div class="fake-activated-ripple"></div>`;
    } else {
      return '';
    }
  }

  protected renderGraphic() {
    const graphicClasses = {
      multi: this.multipleGraphics,
    };

    return html`
      <span class="mdc-deprecated-list-item__graphic material-icons ${
        classMap(graphicClasses)}">
        <slot name="graphic"></slot>
      </span>`;
  }

  protected renderMeta() {
    return html`
      <span class="mdc-deprecated-list-item__meta material-icons">
        <slot name="meta"></slot>
      </span>`;
  }

  protected renderText() {
    const inner = this.twoline ? this.renderTwoline() : this.renderSingleLine();
    return html`
      <span class="mdc-deprecated-list-item__text">
        ${inner}
      </span>`;
  }

  protected renderSingleLine() {
    return html`<slot></slot>`;
  }

  protected renderTwoline() {
    return html`
      <span class="mdc-deprecated-list-item__primary-text">
        <slot></slot>
      </span>
      <span class="mdc-deprecated-list-item__secondary-text">
        <slot name="secondary"></slot>
      </span>
    `;
  }

  protected onClick() {
    this.fireRequestSelected(!this.selected, 'interaction');
  }

  protected onDown(upName: string, evt: Event) {
    const onUp = () => {
      window.removeEventListener(upName, onUp);
      this.rippleHandlers.endPress();
    };

    window.addEventListener(upName, onUp);
    this.rippleHandlers.startPress(evt);
  }

  protected fireRequestSelected(selected: boolean, source: SelectionSource) {
    if (this.noninteractive) {
      return;
    }

    const customEv = new CustomEvent<RequestSelectedDetail>(
        'request-selected',
        {bubbles: true, composed: true, detail: {source, selected}});

    this.dispatchEvent(customEv);
  }

  override connectedCallback() {
    super.connectedCallback();

    if (!this.noninteractive) {
      this.setAttribute('mwc-list-item', '');
    }

    for (const listener of this.listeners) {
      for (const eventName of listener.eventNames) {
        listener.target.addEventListener(
            eventName, listener.cb, {passive: true});
      }
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    for (const listener of this.listeners) {
      for (const eventName of listener.eventNames) {
        listener.target.removeEventListener(eventName, listener.cb);
      }
    }

    if (this._managingList) {
      this._managingList.debouncedLayout ?
          this._managingList.debouncedLayout(true) :
          this._managingList.layout(true);
    }
  }

  // composed flag, event fire through shadow root and up through composed tree
  protected override firstUpdated() {
    const ev = new Event('list-item-rendered', {bubbles: true, composed: true});
    this.dispatchEvent(ev);
  }
}
