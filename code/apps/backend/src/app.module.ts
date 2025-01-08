import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // Fix Swagger bug on Serverless (404 on assets)
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'node_modules/swagger-ui-dist'),
      serveRoot: '/api',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
