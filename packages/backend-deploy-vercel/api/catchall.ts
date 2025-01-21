import type { VercelRequest, VercelResponse } from "@vercel/node";

import { bootstrap } from "@stock-tax-app/backend";

// Keep the app instance in memory for subsequent requests
let app: Awaited<ReturnType<typeof bootstrap>>;

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  // Bootstrap our NestJS app on cold start
  if (!app) app = await bootstrap();

  const instance = app.getHttpAdapter().getInstance();

  instance(request, response);
}
