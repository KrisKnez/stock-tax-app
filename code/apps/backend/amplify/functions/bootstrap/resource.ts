import { defineFunction } from '@aws-amplify/backend';

export const nestBootstrap: any = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'bootstrap',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
});
