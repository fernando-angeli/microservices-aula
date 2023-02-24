import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantesModule } from './restaurantes/restaurantes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (ConfigService: ConfigService) => ({
        uri: ConfigService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    RestaurantesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
