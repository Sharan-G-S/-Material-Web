/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {customElement} from 'lit/decorators.js';

import {styles as elevatedStyles} from './internal/elevated-styles.css.js';
import {styles as sharedStyles} from './internal/shared-styles.css.js';
import {SuggestionChip} from './internal/suggestion-chip.js';
import {styles as forcedColorsStyles} from './internal/suggestion-forced-colors-styles.css.js';
import {styles} from './internal/suggestion-styles.css.js';

declare global {
  interface HTMLElementTagNameMap {
    'md-suggestion-chip': MdSuggestionChip;
  }
}

/**
 * TODO(b/243982145): add docs
 *
 * @final
 * @suppress {visibility}
 */
@customElement('md-suggestion-chip')
export class MdSuggestionChip extends SuggestionChip {
  static override styles =
      [sharedStyles, elevatedStyles, styles, forcedColorsStyles];
}
