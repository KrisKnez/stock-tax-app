import { defineBackend } from '@aws-amplify/backend';

import { nestBootstrap } from './functions/bootstrap/resource';

defineBackend({
  bootstrap: nestBootstrap,
});
