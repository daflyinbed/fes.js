{{#IS_VITE}}
import {{{ workerPath }}};
{{/IS_VITE}}

import { monaco } from {{{ clientPath }}};
import defaultTheme from './theme/default';

defaultTheme.register(monaco);

export default monaco;
