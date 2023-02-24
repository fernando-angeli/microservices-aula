import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('REST API')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    //.addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('', app, document);

  Logger.log(process.env.PORTA);

  const configService = app.get<ConfigService>(ConfigService);

  Logger.log(configService.get('PORTA'));

  //await app.listen(process.env.PORTA);
  await app.listen(configService.get('PORTA'));
}
bootstrap();
