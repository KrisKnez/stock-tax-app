import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    // Fix Swagger bug on Serverless (404 on assets)
    ServeStaticModule.forRoot({
      rootPath: require
        .resolve('swagger-ui-dist/index.html', {
          paths: [require.resolve('@nestjs/swagger')],
        })
        .replace('index.html', ''),
      serveRoot: '/test',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
