/**
@license
Copyright 2019 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { MDCLineRippleAdapter } from '@material/line-ripple/adapter.js';
import { MDCLineRippleFoundation } from '@material/line-ripple/foundation.js';
import { addHasRemoveClass, classMap, FormElement, html, property, query } from '@material/mwc-base/form-element.js';
import { MDCNotchedOutlineAdapter } from '@material/notched-outline/adapter.js';
import { MDCNotchedOutlineFoundation } from '@material/notched-outline/foundation.js';
import { MDCTextFieldAdapter, MDCTextFieldLineRippleAdapter } from '@material/textfield/adapter.js';
import { MDCTextFieldCharacterCounter } from '@material/textfield/character-counter';
import MDCTextFieldFoundation from '@material/textfield/foundation.js';

import { FloatingLabel } from '@material/mwc-floating-label';
import '@material/mwc-floating-label';

const passiveEvents = ['touchstart', 'touchmove', 'scroll', 'mousewheel'];

export abstract class TextFieldBase extends FormElement {
  protected mdcFoundation!: MDCTextFieldFoundation;

  protected readonly mdcFoundationClass = MDCTextFieldFoundation;

  @query('.mdc-text-field')
  protected mdcRoot!: HTMLElement;

  @query('input')
  protected formElement!: HTMLInputElement;

  @query('mwc-floating-label')
  protected labelElement!: FloatingLabel;

  @query('.mdc-line-ripple')
  protected lineRippleElement!: HTMLElement;

  @query('.mdc-notched-outline')
  protected outlineElement!: HTMLElement;

  @query('.mdc-notched-outline__notch')
  protected notchElement!: HTMLElement;

  @query('.mdc-text-field-character-counter')
  protected charCounterElement!: HTMLElement;

  @property()
  value = '';

  @property()
  type = 'text';

  @property()
  placeholder = '';

  @property()
  label = '';

  @property()
  icon = '';

  @property()
  iconTrailing = '';

  @property({type: Boolean, reflect: true})
  disabled = false;

  @property({type: Boolean})
  required = false;

  @property({type: Number})
  maxlength = -1;

  @property({type: Boolean, reflect: true})
  outlined = false;

  @property({type: Boolean, reflect: true})
  fullWidth = false;

  @property()
  helper = '';

  @property({type: Boolean})
  helperPersistent = false;

  @property({type: Boolean})
  charCounter = false;

  protected _lineRippleFoundation: MDCLineRippleFoundation | null = null;
  protected _outlineFoundation: MDCNotchedOutlineFoundation | null = null;
  protected _characterCounter: MDCTextFieldCharacterCounter | null = null;

  render() {
    const classes = {
      'mdc-text-field--disabled': this.disabled,
      'mdc-text-field--no-label': !this.label,
      'mdc-text-field--outlined': this.outlined,
      'mdc-text-field--fullwidth': this.fullWidth,
      'mdc-text-field--with-leading-icon': this.icon,
      'mdc-text-field--with-trailing-icon': this.iconTrailing,
    };
    return html`
      <div class="mdc-text-field ${classMap(classes)}">
        ${this.icon ? this.renderIcon(this.icon) : ''}
        ${this.renderInput()}
        ${this.iconTrailing ? this.renderIcon(this.iconTrailing) : ''}
        ${this.outlined ? this.renderOutlined() : this.renderLabelText()}
      </div>
      ${(this.helper || this.charCounter) ? this.renderHelperText() : ''}
    `;
  }

  protected renderInput() {
    return html`
      <input id="text-field"
          class="mdc-text-field__input"
          type="${this.type}"
          .value="${this.value}"
          ?disabled="${this.disabled}"
          placeholder="${this.placeholder}"
          ?required="${this.required}"
          maxlength="${this.maxlength}"
          @change="${this.handleInputChange}">`;
  }

  protected renderIcon(icon: String) {
    return html`<i class="material-icons mdc-text-field__icon">${icon}</i>`;
  }

  protected renderOutlined() {
    return html`
      <div class="mdc-notched-outline">
        <div class="mdc-notched-outline__leading"></div>
        ${this.label ? html`<div class="mdc-notched-outline__notch">
          <mwc-floating-label
              class="mdc-floating-label"
              .label=${this.label}
              for="text-field">
          </mwc-floating-label>
        </div>` : ''}
        <div class="mdc-notched-outline__trailing"></div>
      </div>`;
  }

  protected renderLabelText() {
    const floatingLabel = html`
      <mwc-floating-label
        class="mdc-floating-label"
        .label=${this.label}
        for="text-field">
      </mwc-floating-label>`;
    return html`
      ${this.label && !this.fullWidth ? floatingLabel : ''}
      <div class="mdc-line-ripple"></div>
    `;
  }

  protected renderHelperText() {
    const classes = {
      'mdc-text-field-helper-text--persistent': this.helperPersistent,
    };
    return html`
      <div class="mdc-text-field-helper-line">
        <div class="mdc-text-field-helper-text ${classMap(classes)}">${this.helper}</div>
        ${this.charCounter ? html`<div class="mdc-text-field-character-counter"></div>` : ''}
      </div>
    `;
  }

  protected handleInputChange() {
    this.value = this.formElement.value;
  }

  protected async createFoundation() {
    if (this.lineRippleElement) {
      this.createLineRippleFoundation();
    }

    if (this.outlineElement) {
      this.createNotchedOutlineFoundation();
    }

    if (this.mdcFoundation !== undefined) {
      this.mdcFoundation.destroy();
    }
    this._characterCounter = this.charCounterElement ? new MDCTextFieldCharacterCounter(this.charCounterElement) : null;
    this.mdcFoundation = new this.mdcFoundationClass(this.createAdapter(), {
      characterCounter: this._characterCounter ? this._characterCounter.foundation : undefined
    });
    if (this.labelElement) {
      await this.labelElement.updateComplete;
    }
    this.mdcFoundation.init();
  }

  protected createLineRippleFoundation() {
    const adapter = this.getLineRippleAdapter();
    this._lineRippleFoundation = new MDCLineRippleFoundation(adapter);
  }

  protected createNotchedOutlineFoundation() {
    const adapter = this.getNotchedOutlineAdapter();
    this._outlineFoundation = new MDCNotchedOutlineFoundation(adapter);
  }

  protected getLineRippleAdapter(): MDCLineRippleAdapter {
    return {
      addClass: className => this.lineRippleElement.classList.add(className),
      removeClass: className => this.lineRippleElement.classList.remove(className),
      hasClass: className => this.lineRippleElement.classList.contains(className),
      setStyle: (propName, value) => this.lineRippleElement.style.setProperty(propName, value),
      registerEventHandler: (evtType, handler) => {this.lineRippleElement.addEventListener(evtType, handler)},
      deregisterEventHandler: (evtType, handler) => {this.lineRippleElement.removeEventListener(evtType, handler)},
    };
  }

  protected getNotchedOutlineAdapter(): MDCNotchedOutlineAdapter {
    return {
      addClass: className => this.outlineElement.classList.add(className),
      removeClass: className => this.outlineElement.classList.remove(className),
      setNotchWidthProperty: width => this.notchElement ? this.notchElement.style.setProperty('width', `${width}px`) : null,
      removeNotchWidthProperty: () => this.notchElement ? this.notchElement.style.removeProperty('width') : null,
    };
  }

  protected createAdapter(): MDCTextFieldAdapter {
    return {
      ...addHasRemoveClass(this.mdcRoot),
      ...this.getRootAdapterMethods(),
      ...this.getInputAdapterMethods(),
      ...this.getLabelAdapterMethods(),
      ...this.getLineRippleAdapterMethods(),
      ...this.getOutlineAdapterMethods(),
    };
  }

  protected getRootAdapterMethods() {
    return {
      registerTextFieldInteractionHandler: (evtType: string,
          handler: any) => this.addEventListener(evtType, handler),
      deregisterTextFieldInteractionHandler: (evtType: string,
          handler: any) => this.removeEventListener(evtType, handler),
      registerValidationAttributeChangeHandler: (handler: any) => {
        const getAttributesList = (mutationsList: MutationRecord[]): string[] => {
          return mutationsList
              .map((mutation) => mutation.attributeName)
              .filter((attributeName) => attributeName) as string[];
        };
        const observer = new MutationObserver((mutationsList) => handler(getAttributesList(mutationsList)));
        const config = {attributes: true};
        observer.observe(this.formElement, config);
        return observer;
      },
      deregisterValidationAttributeChangeHandler: (observer: MutationObserver) => observer.disconnect(),
    };
  }

  protected getInputAdapterMethods() {
    return {
      getNativeInput: () => this.formElement,
      isFocused: () => this.shadowRoot!.activeElement === this.formElement,
      registerInputInteractionHandler: (evtType: string,
          handler: any) => this.formElement.addEventListener(evtType, handler, {passive: evtType in passiveEvents}),
      deregisterInputInteractionHandler: (evtType: string,
          handler: any) => this.formElement.removeEventListener(evtType, handler),
    };
  }

  protected getLabelAdapterMethods() {
    return {
      floatLabel: (shouldFloat: boolean) => this.labelElement && this.labelElement.float(shouldFloat),
      getLabelWidth: () => this.labelElement ? this.labelElement.getWidth() : 0,
      hasLabel: () => Boolean(this.label),
      shakeLabel: (shouldShake: boolean) => this.labelElement && this.labelElement.shake(shouldShake),
    };
  }

  protected getLineRippleAdapterMethods(): MDCTextFieldLineRippleAdapter {
    return {
      activateLineRipple: () => {
        if (this._lineRippleFoundation) {
          this._lineRippleFoundation.activate();
        }
      },
      deactivateLineRipple: () => {
        if (this._lineRippleFoundation) {
          this._lineRippleFoundation.deactivate();
        }
      },
      setLineRippleTransformOrigin: (normalizedX: number) => {
        if (this._lineRippleFoundation) {
          this._lineRippleFoundation.setRippleCenter(normalizedX);
        }
      },
    };
  }

  protected getOutlineAdapterMethods() {
    return {
      closeOutline: () => this._outlineFoundation && this._outlineFoundation.closeNotch(),
      hasOutline: () => Boolean(this._outlineFoundation),
      notchOutline: (labelWidth: number) => this._outlineFoundation && this._outlineFoundation.notch(labelWidth),
    };
  }
}
