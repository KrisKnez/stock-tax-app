import { writeFileSync, existsSync, mkdirSync } from "fs";

import {
  generateNestApp,
  generateSwaggerDocument,
} from "@stock-tax-app/backend";

async function buildSwaggerSpec() {
  const app = await generateNestApp();
  const document = await generateSwaggerDocument(app);

  // Ensure the directory exists
  const filePath = "./dist/json/swagger.json";
  const dir = filePath.substring(0, filePath.lastIndexOf("/"));

  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  // Write the Swagger document to a file
  writeFileSync(filePath, JSON.stringify(document, null, 2));
}

buildSwaggerSpec();
