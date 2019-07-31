import '@material/mwc-snackbar';
import '@material/mwc-checkbox';

import {Snackbar} from '@material/mwc-snackbar';
import {html} from 'lit-html';

import {measureFixtureCreation} from '../helpers';

measureFixtureCreation(
    html`
  <mwc-snackbar id="snack1" labelText="Can't send photo. Retry in 5 seconds.">
    <div id="actionButton" slot="action">RETRY</div>
    <div id="iconButton" slot="dismiss">DISMISS</div>
  </mwc-snackbar>
`,
    {
      afterRender: async (root) => {
        const snackbar = root.querySelector('#snack1') as Snackbar;
        snackbar.open();
      }
    });