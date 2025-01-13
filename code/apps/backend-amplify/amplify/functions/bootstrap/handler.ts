// import {
//   APIGatewayProxyEvent,
//   APIGatewayProxyResult,
//   Context,
//   Handler,
// } from "aws-lambda";

// import { Server } from "http";

import { bootstrap } from "@stock-tax-app/backend";

// let cachedServer: Server;

// async function bootstrapServer() {
//   if (!cachedServer) {
//     const app = await bootstrap();
//     cachedServer = app.getHttpAdapter().getInstance();
//   }
//   return cachedServer;
// }

// export const handler: Handler = async (
//   event: APIGatewayProxyEvent,
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   _context: Context
// ): Promise<APIGatewayProxyResult> => {
//   cachedServer = await bootstrapServer();

//   return new Promise((resolve) => {
//     const request = {
//       method: event.httpMethod,
//       path: event.path,
//       headers: event.headers,
//       body: event.body,
//       query: event.queryStringParameters,
//       multiValueQuery: event.multiValueQueryStringParameters,
//       requestContext: event.requestContext,
//     };

//     const response: {
//       statusCode: number;
//       headers: { [key: string]: string };
//       body: string;
//       setHeader: (key: string, value: string) => void;
//       write: (chunk: any) => void;
//       end: () => void;
//     } = {
//       statusCode: 200,
//       headers: {},
//       body: "",
//       setHeader: function (key: string, value: string) {
//         this.headers[key] = value;
//       },
//       write: function (chunk: any) {
//         this.body += chunk;
//       },
//       end: function () {
//         resolve({
//           statusCode: this.statusCode,
//           headers: this.headers,
//           body: this.body,
//         });
//       },
//     };

//     cachedServer.emit("request", request, response);
//   });
// };

import type { Handler } from 'aws-lambda';

export const handler: Handler = async (event, context) => {
  await bootstrap();
  // your function code goes here
  return 'Hello, World!';
};