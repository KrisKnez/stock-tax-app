import { defineFunction } from '@aws-amplify/backend';

export const bootstrapFunction = defineFunction({
  name: 'bootstrap-function',
  entry: './handler.ts',
});