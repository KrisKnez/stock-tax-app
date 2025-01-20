import { bootstrap } from "@stock-tax-app/backend";

let cachedServer;

async function bootstrapServer() {
  if (!cachedServer) {
    const app = await bootstrap();
    cachedServer = app.getHttpAdapter().getInstance();
  }
  return cachedServer;
}

export async function handler(event, _context) {
  cachedServer = await bootstrapServer();

  cachedServer = await bootstrapServer();

  return new Promise((resolve) => {
    const request = {
      method: event.httpMethod,
      path: event.path,
      headers: event.headers,
      body: event.body,
      query: event.queryStringParameters,
      multiValueQuery: event.multiValueQueryStringParameters,
      requestContext: event.requestContext,
    };

    const response = {
      statusCode: 200,
      headers: {},
      body: "",
      setHeader: function (key, value) {
        this.headers[key] = value;
      },
      write: function (chunk) {
        this.body += chunk;
      },
      end: function () {
        resolve({
          statusCode: this.statusCode,
          headers: this.headers,
          body: this.body,
        });
      },
    };

    cachedServer.emit("request", request, response);
  });
}