/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import '@material/web/iconbutton/outlined-icon-button.js';

import {MdOutlinedIconButton} from '@material/web/iconbutton/outlined-icon-button.js';
import {PlaygroundPreview} from 'playground-elements/playground-preview.js';
import {PostDoc} from 'postdoc-lib';

import {getCurrentThemeString} from '../utils/theme.js';

/**
 * Gets the iframe of a playground preview, and updates the iframe communication
 * library to communicate with the new window on each iframe reload.
 *
 * @param postdoc The instance of the iframe communication library.
 * @param previewEl An element reference to the playground preview element.
 */
async function updateMessageTargetOnIframeLoad(
    postdoc: PostDoc, previewEl: PlaygroundPreview) {
  await previewEl.updateComplete;
  const iframe = previewEl.iframe!;

  iframe.addEventListener('load', (e: Event) => {
    const iframe = e.target as HTMLIFrameElement;
    postdoc.messageTarget = iframe.contentWindow;
  });
}

/**
 * Synchronizes the playground's theme with the material theme applied to the
 * current page every time the playground reloads.
 */
async function syncPlaygroundThemeWithPage() {
  async function onPlaygroundMessage(e: MessageEvent) {
    // if the playground is requesting a new theme, send it the current one
    // from localStorage
    if (e.data === 'request-theme') {
      await postdoc.handshake;
      postdoc.postMessage(getCurrentThemeString());
    }
  }

  // Initialize the iframe communication library
  const postdoc = new PostDoc({
    messageReceiver: window,
    onMessage: onPlaygroundMessage,
  });

  const previewEl = document.querySelector('playground-preview');

  if (!previewEl) {
    return;
  }

  const isPlaygroundDefined = !!customElements.get('playground-preview');

  if (!isPlaygroundDefined) {
    await customElements.whenDefined('playground-preview');
  }

  await updateMessageTargetOnIframeLoad(postdoc, previewEl);
  await postdoc.handshake;

  // Whenever the theme changes, send it to the playground iframe.
  window.addEventListener('theme-changed', async () => {
    await postdoc.handshake;
    postdoc.postMessage(localStorage.getItem('material-theme'));
  });
}

/**
 * Synchronizes the state of the native <details> for the demo dropdown with the
 * slotted <md-outlined-icon-button>. Also deals with some quicks of buttons in
 * <summary> elements
 */
function demoDropdown() {
  const detailsEl = document.querySelector('details');

  // tslint:disable:no-unnecessary-type-assertion TSC externally seems to differ
  // from internal here and needs these type assertions
  const expandButton =
      document.querySelector('summary md-outlined-icon-button') as
      MdOutlinedIconButton;
  const summary = document.querySelector(
                      'summary:has(md-outlined-icon-button)') as HTMLElement;
  // tslint:enable:no-unnecessary-type-assertion

  // Synchronize details open state with toggle button
  detailsEl?.addEventListener('toggle', () => {
    expandButton!.selected = detailsEl.open;
  });

  // Click the summary element because buttons "eat up" the <summary> click.
  expandButton?.addEventListener('click', () => {
    summary.click();
  });
}

syncPlaygroundThemeWithPage();
demoDropdown();
