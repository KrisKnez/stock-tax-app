import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "./dist/json/swagger.json",
    },
    output: {
      target: "./dist/ts/index.ts",
      baseUrl: {
        getBaseUrlFromSpecification: true,
      },
    },
  },
});
