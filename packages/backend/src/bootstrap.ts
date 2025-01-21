import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export async function generateNestApp() {
  return await NestFactory.create(AppModule);
}

export async function generateSwaggerDocument(
  app: INestApplication,
): Promise<OpenAPIObject> {
  const builder = new DocumentBuilder()
    .setTitle('Stock Tax App API')
    .setDescription('The Stock Tax App API description')
    .setVersion('1.0');

  if (process.env.API_URL) builder.addServer(process.env.API_URL);

  return SwaggerModule.createDocument(app, builder.build());
}

export async function bootstrap() {
  const app = await generateNestApp();
  const document = await generateSwaggerDocument(app);

  SwaggerModule.setup('api', app, document);

  // TODO: Implement a custom origin function that allows origin from environment variable
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true);
    },
  });

  await app.init();

  return app;
}
