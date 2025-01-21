import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
// import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    // Fix Swagger bug on Serverless (404 on assets)
    // ServeStaticModule.forRoot({
    //   rootPath: require
    //     .resolve('swagger-ui-dist/package.json', {
    //       paths: [
    //         require
    //           .resolve('@nestjs/swagger/package.json')
    //           .replace('package.json', ''),
    //       ],
    //     })
    //     .replace('package.json', ''),
    //   serveRoot: '/api',
    // }),
    ServeStaticModule.forRoot({
      rootPath: require('swagger-ui-dist').getAbsoluteFSPath(),
      serveRoot: '/api',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
