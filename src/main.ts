import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  const configService = app.get<ConfigService>(ConfigService);
  const PORT = configService.get('port');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
    methods:'*',
    preflightContinue:false
  });
  // app.enableCors({
  //   origin: true,
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //   allowedHeaders: '*',
  //   preflightContinue: false,
  // });


  await app.listen(PORT, () => {
    console.log(`Server running at: ${PORT}`);
  });
}

bootstrap();
