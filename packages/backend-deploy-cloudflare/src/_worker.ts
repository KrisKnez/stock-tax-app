import type {
  Fetcher,
  ExportedHandler,
  Request,
  Response,
} from "@cloudflare/workers-types";
interface Env {
  ASSETS: Fetcher;
}

import { bootstrap } from "@stock-tax-app/backend";

// Keep the app instance in memory for subsequent requests
let app: Awaited<ReturnType<typeof bootstrap>>;

export default {
  async fetch(request: Request, env): Promise<Response> {
    // Bootstrap our NestJS app on cold start
    if (!app) app = await bootstrap();

    const instance = app.getHttpAdapter().getInstance();

    let response: Response;

    instance(request, response);

    return response;
  },
} satisfies ExportedHandler<Env>;
