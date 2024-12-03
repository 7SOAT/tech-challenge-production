import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RepositoryModule } from './externals/mongoose/repositories/repository.module';
import { RouteModule } from './api/route.module';
import { ControllersModule } from './adapters/controllers/controllers.module';
import { OrderQueueRoute } from './api/order-queue/order-queue.route';
import { OrderMicroserviceModule } from './externals/providers/order-microservice/order-microservice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_HOST'),
      }),
      inject: [ConfigService],
    }),    
    RouteModule.register({
      imports: [ControllersModule],
      providers: [],
      controllers: [OrderQueueRoute],
      exports: [],
    }),    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
