import { bootstrap } from './bootstrap';

bootstrap().then((app) => app.listen(process.env.PORT ?? 3000));

// import { createRequire } from 'module';

// // Create a require function that is scoped to the current module URL
// const require = createRequire(import.meta.url);

// // Now you can use require.resolve()
// const resolvedPath = require.resolve('some-package');

// console.log(resolvedPath);

const swaggerUiDist = require('swagger-ui-dist');
console.log(swaggerUiDist.getAbsoluteFSPath());
