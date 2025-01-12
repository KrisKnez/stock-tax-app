// import { HttpAdapterHost } from "@nestjs/core";

import { bootstrap } from "backend";

// Keep the app instance in memory for subsequent requests
let app;
export default async function handler(req, res) {
  // Bootstrap our NestJS app on cold start
  if (!app) app = await bootstrap();

  // const adapterHost = app.get(HttpAdapterHost);
  // const httpAdapter = adapterHost.httpAdapter;
  // const instance = httpAdapter.getInstance();

  const instance = app.getHttpAdapter().getInstance();

  instance(req, res);
}
