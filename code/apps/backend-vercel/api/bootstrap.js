// // /vercel-func.js
// import { HttpAdapterHost } from "@nestjs/core";

// import { bootstrap } from "backend";

// // Keep the app instance in memory for subsequent requests
// let app;
// export default async function handler(req, res) {
//   // Bootstrap our NestJS app on cold start
//   if (!app) app = await bootstrap();

//   const adapterHost = app.get(HttpAdapterHost);
//   const httpAdapter = adapterHost.httpAdapter;
//   const instance = httpAdapter.getInstance();

//   instance(req, res);
// }

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json({ message: 'Welcome to the Bootstrap API!', data: null });
      break;
    case 'POST':
      const body = req.body;
      res.status(200).json({ message: 'POST request received!', data: body });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ message: `Method ${method} not allowed` });
  }
}
