import { bootstrap } from './bootstrap';

bootstrap().then((app) => app.listen(process.env.PORT ?? 3000));

const swaggerUiDistPath = require
  .resolve('swagger-ui-dist/package.json', {
    paths: [
      require
        .resolve('@nestjs/swagger/package.json')
        .replace('package.json', ''),
    ],
  })
  .replace('package.json', '');

// Execute command ls on the directory of swagger-ui-dist
console.log(
  require('child_process').execSync(`ls ${swaggerUiDistPath}`).toString(),
);