import { defineFunction } from "@aws-amplify/backend";

export const bootstrapFunction = defineFunction({
  name: "bootstrap-function",
  entry: "./handler.ts",
  layers: {
    // Layers get injected into ESBuild's `external` option
    ...Object.fromEntries(
      [
        "class-validator",
        "class-transformer",
        "@fastify/static",
        "@nestjs/microservices",
        "@nestjs/websockets",
      ].map((name) => [name, "ExternalDependency:1"])
    ),
  },
});
