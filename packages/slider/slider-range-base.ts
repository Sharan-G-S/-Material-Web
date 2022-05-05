/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Style preference for leading underscores.
// tslint:disable:strip-private-property-underscore

import '@material/mwc-ripple/mwc-ripple.js';

import {deepActiveElementPath} from '@material/mwc-base/utils.js';
import {Ripple} from '@material/mwc-ripple/mwc-ripple.js';
import {RippleHandlers} from '@material/mwc-ripple/ripple-handlers.js';
import {MDCSliderAdapter} from '@material/slider/adapter.js';
import {Thumb, TickMark} from '@material/slider/types.js';
import {html, nothing, PropertyValues, TemplateResult} from 'lit';
import {property, query, queryAsync, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import {ifDefined} from 'lit/directives/if-defined.js';
import {styleMap} from 'lit/directives/style-map.js';

import {SliderBase} from './slider-base.js';

export {Thumb} from '@material/slider/types.js';

export class SliderRangeBase extends SliderBase {
  @query('input.start') protected startInput!: HTMLInputElement;
  @query('.start.mdc-slider__thumb') protected startThumb!: HTMLElement;
  @query('.start.mdc-slider__thumb .mdc-slider__thumb-knob')
  protected startThumbKnob!: HTMLElement;
  @query('.start.mdc-slider__thumb .mdc-slider__value-indicator-container')
  protected startValueIndicatorContainer!: HTMLElement;
  @queryAsync('.start .ripple') protected startRipple!: Promise<Ripple|null>;
  @property({type: Number}) valueStart: number = 0;
  @state() protected startThumbWithIndicator = false;
  @state() protected startThumbTop = false;
  @state() protected shouldRenderStartRipple = false;
  @state() protected startThumbTransformStyle: string = '';
  @state() protected startThumbTransitionStyle: string = '';
  @state() protected startThumbCssProperties: {[key: string]: string} = {};

  protected startRippleHandlers = new RippleHandlers(() => {
    this.shouldRenderStartRipple = true;
    return this.startRipple;
  });

  override update(changed: PropertyValues) {
    if (changed.has('valueStart') && this.mdcFoundation) {
      this.mdcFoundation.setValueStart(this.valueStart);

      const validVal = this.mdcFoundation.getValueStart();

      if (validVal !== this.valueStart) {
        this.valueStart = validVal;
      }
    }

    super.update(changed);
  }

  protected override renderRootEl(content: TemplateResult) {
    const rootClasses = classMap({
      'mdc-slider--disabled': this.disabled,
      'mdc-slider--discrete': this.discrete,
    });

    return html`
    <div
        class="mdc-slider mdc-slider--range ${rootClasses}"
        @pointerdown=${this.onPointerdown}
        @pointerup=${this.onPointerup}
        @contextmenu=${this.onContextmenu}>
      ${content}
    </div>`;
  }

  protected override renderStartInput() {
    return html`
      <input
          class="mdc-slider__input start"
          type="range"
          step=${this.step}
          min=${this.min}
          max=${this.valueEnd}
          .value=${this.valueStart as unknown as string}
          @change=${this.onStartChange}
          @focus=${this.onStartFocus}
          @blur=${this.onStartBlur}
          ?disabled=${this.disabled}
          aria-label=${ifDefined(this.ariaLabel)}
          aria-labelledby=${ifDefined(this.ariaLabelledBy)}
          aria-describedby=${ifDefined(this.ariaDescribedBy)}
          aria-valuetext=${
        ifDefined(this.valueToAriaTextTransform?.(this.valueStart))}>
    `;
  }

  protected override renderEndInput() {
    return html`
      <input
          class="mdc-slider__input end"
          type="range"
          step=${this.step}
          min=${this.valueStart}
          max=${this.max}
          .value=${this.valueEnd as unknown as string}
          @change=${this.onEndChange.bind(this)}
          @focus=${this.onEndFocus}
          @blur=${this.onEndBlur}
          ?disabled=${this.disabled}
          name=${this.name}
          aria-label=${ifDefined(this.ariaLabel)}
          aria-labelledby=${ifDefined(this.ariaLabelledBy)}
          aria-describedby=${ifDefined(this.ariaDescribedBy)}
          aria-valuetext=${
        ifDefined(this.valueToAriaTextTransform?.(this.valueEnd))}>
    `;
  }

  protected override renderTrack() {
    const trackStyles = styleMap({
      'transform-origin': this.trackTransformOriginStyle,
      'left': this.trackLeftStyle ?
          this.trackLeftStyle :
          getComputedStyle(this).direction === 'rtl' ?
          '' :
          `calc(${
              (this.valueStart - this.min) / (this.max - this.min) * 100}%)`,
      'right': this.trackRightStyle ?
          this.trackRightStyle :
          getComputedStyle(this).direction !== 'rtl' ?
          '' :
          `calc(${
              (this.valueStart - this.min) / (this.max - this.min) * 100}%)`,
      '-webkit-transform': `scaleX(${
          (this.valueEnd - this.valueStart) / (this.max - this.min)})`,
      'transform': `scaleX(${
          (this.valueEnd - this.valueStart) / (this.max - this.min)})`,
      '-webkit-transition': this.trackTransitionStyle,
      'transition': this.trackTransitionStyle,
    });

    return html`
      <div class="mdc-slider__track">
        <div class="mdc-slider__track--inactive"></div>
        <div class="mdc-slider__track--active">
          <div
              class="mdc-slider__track--active_fill"
              style=${trackStyles}>
          </div>
        </div>
      </div>`;
  }

  protected override renderStartThumb() {
    const startThumbClasses = classMap({
      'mdc-slider__thumb--with-indicator': this.startThumbWithIndicator,
      'mdc-slider__thumb--top': this.startThumbTop,
    });

    const startThumbStyles = styleMap({
      '-webkit-transform': this.startThumbTransformStyle,
      'transform': this.startThumbTransformStyle,
      '-webkit-transition': this.startThumbTransitionStyle,
      'transition': this.startThumbTransitionStyle,
      'left': this.startThumbTransformStyle ?
          '' :
          getComputedStyle(this).direction === 'rtl' ?
          '' :
          `calc(${
              (this.valueStart - this.min) / (this.max - this.min) *
              100}% - 24px)`,
      'right': this.startThumbTransformStyle ?
          '' :
          getComputedStyle(this).direction !== 'rtl' ?
          '' :
          `calc(${
              (this.valueStart - this.min) / (this.max - this.min) *
              100}% - 24px)`,
      ...this.startThumbCssProperties,
    });

    const ripple = !this.shouldRenderStartRipple ?
        nothing :
        html`<mwc-ripple class="ripple" unbounded></mwc-ripple>`;
    return html`
      <div
          class="mdc-slider__thumb start ${startThumbClasses}"
          style=${startThumbStyles}
          @mouseenter=${this.onStartMouseenter}
          @mouseleave=${this.onStartMouseleave}>
        ${ripple}
        ${
        this.renderValueIndicator(
            this.valueToValueIndicatorTransform(this.valueStart))}
        <div class="mdc-slider__thumb-knob"></div>
      </div>
    `;
  }

  protected override createAdapter(): MDCSliderAdapter {
    return {
      addClass: (className) => {
        switch (className) {
          case 'mdc-slider--disabled':
            this.disabled = true;
            break;
        }
      },
      removeClass: (className) => {
        switch (className) {
          case 'mdc-slider--disabled':
            this.disabled = false;
            break;
        }
      },
      hasClass: (className) => {
        switch (className) {
          case 'mdc-slider--disabled':
            return this.disabled;
          case 'mdc-slider--range':
            return true;
          case 'mdc-slider--discrete':
            return this.discrete;
          default:
            return false;
        }
      },
      addThumbClass: (className, thumb) => {
        if (thumb === Thumb.START) {
          switch (className) {
            case 'mdc-slider__thumb--with-indicator':
              this.startThumbWithIndicator = true;
              break;
            case 'mdc-slider__thumb--top':
              this.startThumbTop = true;
              break;
          }
        } else {
          switch (className) {
            case 'mdc-slider__thumb--with-indicator':
              this.endThumbWithIndicator = true;
              break;
            case 'mdc-slider__thumb--top':
              this.endThumbTop = true;
              break;
          }
        }
      },
      removeThumbClass: (className, thumb) => {
        if (thumb === Thumb.START) {
          switch (className) {
            case 'mdc-slider__thumb--with-indicator':
              this.startThumbWithIndicator = false;
              break;
            case 'mdc-slider__thumb--top':
              this.startThumbTop = false;
              break;
          }
        } else {
          switch (className) {
            case 'mdc-slider__thumb--with-indicator':
              this.endThumbWithIndicator = false;
              break;
            case 'mdc-slider__thumb--top':
              this.endThumbTop = false;
              break;
          }
        }
      },
      registerEventHandler: () => {
        // handled in bindings
      },
      deregisterEventHandler: () => {
        // handled in bindings
      },
      registerBodyEventHandler: (eventName, handler) => {
        document.body.addEventListener(eventName, handler);
      },
      deregisterBodyEventHandler: (eventName, handler) => {
        document.body.removeEventListener(eventName, handler);
      },
      registerInputEventHandler: (thumb, eventName, handler) => {
        if (thumb === Thumb.START) {
          this.startInput.addEventListener(eventName, handler);
        } else {
          this.formElement.addEventListener(eventName, handler);
        }
      },
      deregisterInputEventHandler: (thumb, eventName, handler) => {
        if (thumb === Thumb.START) {
          this.startInput.removeEventListener(eventName, handler);
        } else {
          this.formElement.removeEventListener(eventName, handler);
        }
      },
      registerThumbEventHandler: () => {
        // handled by bindings
      },
      deregisterThumbEventHandler: () => {
        // handled by bindings
      },
      registerWindowEventHandler: (eventName, handler) => {
        window.addEventListener(eventName, handler);
      },
      deregisterWindowEventHandler: (eventName, handler) => {
        window.removeEventListener(eventName, handler);
      },
      emitChangeEvent: (value, thumb) => {
        const event = new CustomEvent(
            'change', {bubbles: true, composed: true, detail: {value, thumb}});
        this.dispatchEvent(event);
      },
      emitDragEndEvent: (_value, thumb) => {
        // Emitting event is not yet implemented. See issue:
        // https://github.com/material-components/material-components-web/issues/6448
        if (thumb === Thumb.START) {
          this.startRippleHandlers.endPress();
        } else {
          this.endRippleHandlers.endPress();
        }
      },
      emitDragStartEvent: (_value, thumb) => {
        // Emitting event is not yet implemented. See issue:
        // https://github.com/material-components/material-components-web/issues/6448
        if (thumb === Thumb.START) {
          this.startRippleHandlers.startPress();
        } else {
          this.endRippleHandlers.startPress();
        }
      },
      emitInputEvent: (value, thumb) => {
        const event = new CustomEvent(
            'input', {bubbles: true, composed: true, detail: {value, thumb}});
        this.dispatchEvent(event);
      },
      focusInput: (thumb) => {
        if (thumb === Thumb.START) {
          this.startInput.focus();
        } else {
          this.formElement.focus();
        }
      },
      getAttribute: () => {
        // never seems to actually be used
        return '';
      },
      getBoundingClientRect: () => {
        return this.mdcRoot.getBoundingClientRect();
      },
      getInputAttribute: (attrName, thumb) => {
        if (thumb === Thumb.START) {
          switch (attrName) {
            case 'min':
              return this.min.toString();
            case 'max':
              return this.valueEnd.toString();
            case 'value':
              return this.valueStart.toString();
            case 'step':
              return this.step.toString();
            default:
              return null;
          }
        }

        switch (attrName) {
          case 'min':
            return this.valueStart.toString();
          case 'max':
            return this.max.toString();
          case 'value':
            return this.valueEnd.toString();
          case 'step':
            return this.step.toString();
          default:
            return null;
        }
      },
      getInputValue: (thumb) => {
        if (thumb === Thumb.START) {
          return this.valueStart.toString();
        }

        return this.valueEnd.toString();
      },
      getThumbBoundingClientRect: (thumb) => {
        if (thumb === Thumb.START) {
          return this.startThumb.getBoundingClientRect();
        }

        return this.endThumb.getBoundingClientRect();
      },
      getThumbKnobWidth: (thumb) => {
        if (thumb === Thumb.START) {
          return this.startThumbKnob.getBoundingClientRect().width;
        }

        return this.endThumbKnob.getBoundingClientRect().width;
      },
      getValueIndicatorContainerWidth: (thumb) => {
        if (thumb === Thumb.START) {
          return this.startValueIndicatorContainer.getBoundingClientRect()
              .width;
        }

        return this.endValueIndicatorContainer.getBoundingClientRect().width;
      },
      getValueToAriaValueTextFn: () => {
        return this.valueToAriaTextTransform
      },
      isInputFocused: (thumb) => {
        const activeElements = deepActiveElementPath();
        const deepActivEl = activeElements[activeElements.length - 1];

        if (thumb === Thumb.START) {
          return deepActivEl === this.startInput;
        }

        return deepActivEl === this.formElement;
      },
      isRTL: () => {
        return getComputedStyle(this).direction === 'rtl';
      },
      setInputAttribute: (attribute, _value, thumb) => {
        if (thumb === Thumb.START) {
          switch (attribute) {
            case 'disabled':
            case 'value':
            case 'aria-valuetext':
              // handled by bindings
              break;
          }
        }

        switch (attribute) {
          case 'disabled':
          case 'value':
          case 'aria-valuetext':
            // handled by bindings
            break;
        }
      },
      removeInputAttribute: (attribute) => {
        switch (attribute) {
          case 'disabled':
            // handled by bindings
            break;
        }
      },
      setThumbStyleProperty: (name, value, thumb) => {
        if (thumb === Thumb.START) {
          switch (name) {
            case 'transform':
            case '-webkit-transform':
              this.startThumbTransformStyle = value;
              break;
            case 'transition':
            case '-webkit-transition':
              this.startThumbTransitionStyle = value;
              break;
            default:
              if (name.startsWith('--')) {
                this.startThumbCssProperties[name] = value;
              }
          }
        } else {
          switch (name) {
            case 'transform':
            case '-webkit-transform':
              this.endThumbTransformStyle = value;
              break;
            case 'transition':
            case '-webkit-transition':
              this.endThumbTransitionStyle = value;
              break;
            default:
              if (name.startsWith('--')) {
                this.endThumbCssProperties[name] = value;
              }
          }
        }
      },
      removeThumbStyleProperty: (name, thumb) => {
        if (thumb === Thumb.START) {
          switch (name) {
            case 'left':
            case 'right':
              // handled by bindings
              break;
            case 'transition':
            case '-webkit-transition':
              this.startThumbTransitionStyle = '';
              break;
          }
        } else {
          switch (name) {
            case 'left':
            case 'right':
              // handled by bindings
              break;
            case 'transition':
            case '-webkit-transition':
              this.endThumbTransitionStyle = '';
              break;
          }
        }
      },
      setTrackActiveStyleProperty: (name, value) => {
        switch (name) {
          case 'transform-origin':
            this.trackTransformOriginStyle = value;
            break;
          case 'left':
            this.trackLeftStyle = value;
            break;
          case 'right':
            this.trackRightStyle = value;
            break;
          case 'transform':
          case '-webkit-transform':
            // handled by bindings
            break;
          case 'transition':
          case '-webkit-transition':
            this.trackTransitionStyle = value;
            break;
        }
      },
      removeTrackActiveStyleProperty: (name) => {
        switch (name) {
          case 'transition':
          case '-webkit-transition':
            this.trackTransitionStyle = '';
            break;
        }
      },
      setInputValue: (value, thumb) => {
        if (thumb === Thumb.START) {
          this.valueStart = Number(value);
        } else {
          this.valueEnd = Number(value);
        }
      },
      setPointerCapture: (pointerId) => {
        this.mdcRoot.setPointerCapture(pointerId);
      },
      setValueIndicatorText: () => {
        // handled by bidnings
      },
      updateTickMarks: (tickMarks: TickMark[]) => {
        this.tickMarks = tickMarks;
      },
    };
  }

  protected onStartChange(e: Event) {
    this.valueStart = Number((e.target as HTMLInputElement).value);
    this.mdcFoundation?.handleInputChange(Thumb.START);
  }

  protected onStartFocus() {
    this.mdcFoundation?.handleInputFocus(Thumb.START);
    this.startRippleHandlers.startFocus();
  }

  protected onStartBlur() {
    this.mdcFoundation?.handleInputBlur(Thumb.START);
    this.startRippleHandlers.endFocus();
  }

  protected onStartMouseenter() {
    this.mdcFoundation?.handleThumbMouseenter();
    this.startRippleHandlers.startHover();
  }

  protected onStartMouseleave() {
    this.mdcFoundation?.handleThumbMouseleave();
    this.startRippleHandlers.endHover();
  }

  protected override setFormData(formData: FormData) {
    if (this.name) {
      formData.append(`${this.name}-start`, `${this.valueStart}`);
      formData.append(`${this.name}-end`, `${this.valueEnd}`);
    }
  }
}
