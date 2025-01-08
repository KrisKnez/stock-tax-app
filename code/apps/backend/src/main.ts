import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  return app;
}
bootstrap().then((app) => app.listen(process.env.PORT ?? 3000));
