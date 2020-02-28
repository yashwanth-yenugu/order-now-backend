import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Food')
  .setDescription('GEt SET ATTCKK')
  .setVersion('1.0')
  .addTag('SHVY')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('shvy/swagger', app, document);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
