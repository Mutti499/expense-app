import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CustomInterceptor } from './custom/custom.interceptor';
 
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,// the interceptor will change the response to the DTO type
      //useClass: CustomInterceptor// hand-written interceptor to understand the concept
    }],
})
export class AppModule {}
