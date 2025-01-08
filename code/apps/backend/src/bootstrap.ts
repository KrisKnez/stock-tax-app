import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.init();

  // const nestjsSwaggerPath = require.resolve('@nestjs/swagger');
  // // .replace('index.js', '');

  // const swaggerUiDistPath = require.resolve('swagger-ui-dist', {
  //   paths: [nestjsSwaggerPath],
  // });

  // console.log(swaggerUiDistPath);

  return app;
}
