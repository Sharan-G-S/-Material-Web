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
import {css} from 'lit-element/lit-element.js';

export const style = css`@keyframes mdc-ripple-fg-radius-in{from{animation-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transform:translate(var(--mdc-ripple-fg-translate-start, 0)) scale(1)}to{transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}}@keyframes mdc-ripple-fg-opacity-in{from{animation-timing-function:linear;opacity:0}to{opacity:var(--mdc-ripple-fg-opacity, 0)}}@keyframes mdc-ripple-fg-opacity-out{from{animation-timing-function:linear;opacity:var(--mdc-ripple-fg-opacity, 0)}to{opacity:0}}.mdc-ripple-surface--test-edge-var-bug{--mdc-ripple-surface-test-edge-var: 1px solid #000;visibility:hidden}.mdc-ripple-surface--test-edge-var-bug::before{border:var(--mdc-ripple-surface-test-edge-var)}.mdc-list{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.00937em;text-decoration:inherit;text-transform:inherit;color:rgba(0,0,0,0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0,0,0,0.87));margin:0;padding:8px 0;line-height:1.5rem;list-style-type:none}.mdc-list-item__secondary-text{color:rgba(0,0,0,0.54);color:var(--mdc-theme-text-secondary-on-background, rgba(0,0,0,0.54))}.mdc-list-item__graphic{background-color:rgba(0,0,0,0)}.mdc-list-item__graphic{color:rgba(0,0,0,0.38);color:var(--mdc-theme-text-icon-on-background, rgba(0,0,0,0.38))}.mdc-list-item__meta{color:rgba(0,0,0,0.38);color:var(--mdc-theme-text-hint-on-background, rgba(0,0,0,0.38))}.mdc-list--dense{padding-top:4px;padding-bottom:4px;font-size:.812rem}.mdc-list-item{display:flex;position:relative;align-items:center;justify-content:flex-start;height:48px;padding:0 16px;overflow:hidden}.mdc-list-item:focus{outline:none}.mdc-list-item--selected,.mdc-list-item--activated{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-list-item--selected .mdc-list-item__graphic,.mdc-list-item--activated .mdc-list-item__graphic{color:#6200ee;color:var(--mdc-theme-primary, #6200ee)}.mdc-list-item__graphic{margin-left:0;margin-right:32px;width:24px;height:24px;display:inline-flex;flex-shrink:0;align-items:center;justify-content:center}.mdc-list-item[dir="rtl"] .mdc-list-item__graphic,[dir="rtl"] .mdc-list-item .mdc-list-item__graphic{margin-left:32px;margin-right:0}.mdc-list-item__meta{margin-left:auto;margin-right:0}.mdc-list-item[dir="rtl"] .mdc-list-item__meta,[dir="rtl"] .mdc-list-item .mdc-list-item__meta{margin-left:0;margin-right:auto}.mdc-list-item__text,.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block}.mdc-list-item__secondary-text{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:.875rem;line-height:1.25rem;font-weight:400;letter-spacing:.01786em;text-decoration:inherit;text-transform:inherit}.mdc-list--dense .mdc-list-item__secondary-text{font-size:inherit}.mdc-list--dense .mdc-list-item{height:40px}.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:36px;width:20px;height:20px}.mdc-list-item[dir="rtl"] .mdc-list--dense .mdc-list-item__graphic,[dir="rtl"] .mdc-list-item .mdc-list--dense .mdc-list-item__graphic{margin-left:36px;margin-right:0}.mdc-list--avatar-list .mdc-list-item{height:56px}.mdc-list--avatar-list .mdc-list-item__graphic{margin-left:0;margin-right:16px;width:40px;height:40px;border-radius:50%}.mdc-list-item[dir="rtl"] .mdc-list--avatar-list .mdc-list-item__graphic,[dir="rtl"] .mdc-list-item .mdc-list--avatar-list .mdc-list-item__graphic{margin-left:16px;margin-right:0}:not(.mdc-list--non-interactive)>.mdc-list-item{--mdc-ripple-fg-size: 0;--mdc-ripple-left: 0;--mdc-ripple-top: 0;--mdc-ripple-fg-scale: 1;--mdc-ripple-fg-translate-end: 0;--mdc-ripple-fg-translate-start: 0;-webkit-tap-highlight-color:rgba(0,0,0,0);will-change:transform, opacity}:not(.mdc-list--non-interactive)>.mdc-list-item::before,:not(.mdc-list--non-interactive)>.mdc-list-item::after{position:absolute;border-radius:50%;opacity:0;pointer-events:none;content:""}:not(.mdc-list--non-interactive)>.mdc-list-item::before{transition:opacity 15ms linear;z-index:1}:not(.mdc-list--non-interactive)>.mdc-list-item.mdc-ripple-upgraded::before{transform:scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-list--non-interactive)>.mdc-list-item.mdc-ripple-upgraded::after{top:0;left:0;transform:scale(0);transform-origin:center center}:not(.mdc-list--non-interactive)>.mdc-list-item.mdc-ripple-upgraded--unbounded::after{top:var(--mdc-ripple-top, 0);left:var(--mdc-ripple-left, 0)}:not(.mdc-list--non-interactive)>.mdc-list-item.mdc-ripple-upgraded--foreground-activation::after{animation:225ms mdc-ripple-fg-radius-in forwards,75ms mdc-ripple-fg-opacity-in forwards}:not(.mdc-list--non-interactive)>.mdc-list-item.mdc-ripple-upgraded--foreground-deactivation::after{animation:150ms mdc-ripple-fg-opacity-out;transform:translate(var(--mdc-ripple-fg-translate-end, 0)) scale(var(--mdc-ripple-fg-scale, 1))}:not(.mdc-list--non-interactive)>.mdc-list-item::before,:not(.mdc-list--non-interactive)>.mdc-list-item::after{top:calc(50% - 100%);left:calc(50% - 100%);width:200%;height:200%}:not(.mdc-list--non-interactive)>.mdc-list-item.mdc-ripple-upgraded::after{width:var(--mdc-ripple-fg-size, 100%);height:var(--mdc-ripple-fg-size, 100%)}:not(.mdc-list--non-interactive)>.mdc-list-item::before,:not(.mdc-list--non-interactive)>.mdc-list-item::after{background-color:#000}:not(.mdc-list--non-interactive)>.mdc-list-item:hover::before{opacity:.04}:not(.mdc-list--non-interactive)>.mdc-list-item:not(.mdc-ripple-upgraded):focus::before,:not(.mdc-list--non-interactive)>.mdc-list-item.mdc-ripple-upgraded--background-focused::before{transition-duration:75ms;opacity:.12}:not(.mdc-list--non-interactive)>.mdc-list-item:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}:not(.mdc-list--non-interactive)>.mdc-list-item:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.16}:not(.mdc-list--non-interactive)>.mdc-list-item.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: .16}:not(.mdc-list--non-interactive)>.mdc-list-item--activated::before{opacity:.12}:not(.mdc-list--non-interactive)>.mdc-list-item--activated::before,:not(.mdc-list--non-interactive)>.mdc-list-item--activated::after{background-color:#6200ee}@supports not (-ms-ime-align: auto){:not(.mdc-list--non-interactive)>.mdc-list-item--activated::before,:not(.mdc-list--non-interactive)>.mdc-list-item--activated::after{background-color:var(--mdc-theme-primary, #6200ee)}}:not(.mdc-list--non-interactive)>.mdc-list-item--activated:hover::before{opacity:.16}:not(.mdc-list--non-interactive)>.mdc-list-item--activated:not(.mdc-ripple-upgraded):focus::before,:not(.mdc-list--non-interactive)>.mdc-list-item--activated.mdc-ripple-upgraded--background-focused::before{transition-duration:75ms;opacity:.24}:not(.mdc-list--non-interactive)>.mdc-list-item--activated:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}:not(.mdc-list--non-interactive)>.mdc-list-item--activated:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.28}:not(.mdc-list--non-interactive)>.mdc-list-item--activated.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: .28}:not(.mdc-list--non-interactive)>.mdc-list-item--selected::before{opacity:.08}:not(.mdc-list--non-interactive)>.mdc-list-item--selected::before,:not(.mdc-list--non-interactive)>.mdc-list-item--selected::after{background-color:#6200ee}@supports not (-ms-ime-align: auto){:not(.mdc-list--non-interactive)>.mdc-list-item--selected::before,:not(.mdc-list--non-interactive)>.mdc-list-item--selected::after{background-color:var(--mdc-theme-primary, #6200ee)}}:not(.mdc-list--non-interactive)>.mdc-list-item--selected:hover::before{opacity:.12}:not(.mdc-list--non-interactive)>.mdc-list-item--selected:not(.mdc-ripple-upgraded):focus::before,:not(.mdc-list--non-interactive)>.mdc-list-item--selected.mdc-ripple-upgraded--background-focused::before{transition-duration:75ms;opacity:.2}:not(.mdc-list--non-interactive)>.mdc-list-item--selected:not(.mdc-ripple-upgraded)::after{transition:opacity 150ms linear}:not(.mdc-list--non-interactive)>.mdc-list-item--selected:not(.mdc-ripple-upgraded):active::after{transition-duration:75ms;opacity:.24}:not(.mdc-list--non-interactive)>.mdc-list-item--selected.mdc-ripple-upgraded{--mdc-ripple-fg-opacity: .24}.mdc-list--two-line .mdc-list-item{height:72px}.mdc-list--two-line.mdc-list--dense .mdc-list-item{height:60px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item{height:48px}.mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:0;margin-right:20px;width:36px;height:36px}.mdc-list-item[dir="rtl"] .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic,[dir="rtl"] .mdc-list-item .mdc-list--avatar-list.mdc-list--dense .mdc-list-item__graphic{margin-left:20px;margin-right:0}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-divider{height:0;margin:0;border:none;border-bottom-width:1px;border-bottom-style:solid}.mdc-list-divider{border-bottom-color:rgba(0,0,0,0.12)}.mdc-list-divider--padded{margin:0 16px}.mdc-list-divider--inset{margin-left:72px;margin-right:0;width:calc(100% - 72px)}.mdc-list-group[dir="rtl"] .mdc-list-divider--inset,[dir="rtl"] .mdc-list-group .mdc-list-divider--inset{margin-left:0;margin-right:72px}.mdc-list-divider--inset.mdc-list-divider--padded{width:calc(100% - 72px - 16px)}.mdc-list-group .mdc-list{padding:0}.mdc-list-group__subheader{font-family:Roboto,sans-serif;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font-size:1rem;line-height:1.75rem;font-weight:400;letter-spacing:.00937em;text-decoration:inherit;text-transform:inherit;margin:.75rem 16px}.mdc-list-group__subheader{color:rgba(0,0,0,0.87);color:var(--mdc-theme-text-primary-on-background, rgba(0,0,0,0.87))}.material-icons{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:'liga';-webkit-font-smoothing:antialiased}:host([aria-disabled="true"])>.mdc-list-item:focus::before{opacity:0}`;
