/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '../../focus/focus-ring';

import {ariaProperty as legacyAriaProperty} from '@material/mwc-base/aria-property';
import {html, LitElement, TemplateResult} from 'lit';
import {eventOptions, property, state} from 'lit/decorators';
import {ClassInfo, classMap} from 'lit/directives/class-map';
import {ifDefined} from 'lit/directives/if-defined';

import {FormController, getFormValue} from '../../controller/form-controller';
import {ariaProperty} from '../../decorators/aria-property';
import {pointerPress as focusRingPointerPress, shouldShowStrongFocus} from '../../focus/strong-focus';

/** @soyCompatible */
export class Switch extends LitElement {
  static override shadowRootOptions:
      ShadowRootInit = {mode: 'open', delegatesFocus: true};

  @property({type: Boolean, reflect: true}) disabled = false;
  @property({type: Boolean}) processing = false;
  @property({type: Boolean}) selected = false;
  @property({type: Boolean}) icons = false;

  // Aria
  @ariaProperty
  // TODO(b/210730484): replace with @soyParam annotation
  @property({type: String, attribute: 'data-aria-label', noAccessor: true})
  override ariaLabel!: string;

  // TODO: Add support in @ariaProperty for idref aria attributes
  /** @soyPrefixAttribute */
  @legacyAriaProperty
  @property({type: String, attribute: 'aria-labelledby'})
  ariaLabelledBy = '';

  @state() protected showFocusRing = false;

  // FormController
  get form() {
    return this.closest('form');
  }
  @property({type: String, reflect: true}) name = '';
  @property({type: String}) value = 'on';
  [getFormValue]() {
    return this.selected ? this.value : null;
  }

  constructor() {
    super();
    this.addController(new FormController(this));
  }

  override click() {
    this.handleClick();
    super.click();
  }

  /** @soyTemplate */
  protected override render(): TemplateResult {
    // TODO(b/230763631): update this template to include spans instead of divs
    return html`
      <button
        type="button"
        class="md3-switch ${classMap(this.getRenderClasses())}"
        role="switch"
        aria-checked="${this.selected}"
        aria-label="${ifDefined(this.ariaLabel)}"
        aria-labelledby="${ifDefined(this.ariaLabelledBy || undefined)}"
        .disabled=${this.disabled}
        @click=${this.handleClick}
        @focus="${this.handleFocus}"
        @blur="${this.handleBlur}"
        @pointerdown="${this.handlePointerDown}"
      >
        ${this.renderFocusRing()}
        <div class="md3-switch__track">
          ${this.renderHandle()}
        </div>
      </button>

      <input
        type="checkbox"
        aria-hidden="true"
        name="${this.name}"
        .checked=${this.selected}
        .value=${this.value}
      >
    `;
  }

  /** @soyTemplate */
  protected getRenderClasses(): ClassInfo {
    return {
      'md3-switch--processing': this.processing,
      'md3-switch--selected': this.selected,
      'md3-switch--unselected': !this.selected,
    };
  }

  /** @soyTemplate */
  protected renderFocusRing(): TemplateResult {
    return html`<md-focus-ring .visible="${
        this.showFocusRing}"></md-focus-ring>`;
  }

  /** @soyTemplate */
  protected renderHandle(): TemplateResult {
    return html`
      <div class="md3-switch__handle">
        ${this.icons ? this.maybeRenderIcons() : html``}
      </div>
    `;
  }

  /** @soyTemplate */
  private maybeRenderIcons(): TemplateResult {
    return html`
      <div class="md3-switch__icons">
        ${this.renderOnIcon()}
        ${this.renderOffIcon()}
      </div>
    `;
  }

  /** @soyTemplate */
  protected renderOnIcon(): TemplateResult {
    return html`
      <svg class="md3-switch__icon md3-switch__icon--on" viewBox="0 0 24 24">
        <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
      </svg>
    `;
  }

  /** @soyTemplate */
  protected renderOffIcon(): TemplateResult {
    return html`
      <svg class="md3-switch__icon md3-switch__icon--off" viewBox="0 0 24 24">
        <path d="M20 13H4v-2h16v2z" />
      </svg>
    `;
  }

  protected handleClick() {
    if (this.disabled) {
      return;
    }

    this.selected = !this.selected;
  }

  protected handleFocus() {
    this.showFocusRing = shouldShowStrongFocus();
  }

  protected handleBlur() {
    this.showFocusRing = false;
  }

  @eventOptions({passive: true})
  protected handlePointerDown(event: PointerEvent) {
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    focusRingPointerPress();
    this.showFocusRing = false;
  }
}
