import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

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

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      always: true,
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    }),
  );

  // TODO: Implement a custom origin function that allows origin from environment variable
  app.enableCors({
    origin: (origin, callback) => {
      callback(null, true);
    },
  });

  const document = await generateSwaggerDocument(app);
  SwaggerModule.setup('api', app, document);

  await app.init();

  return app;
}
