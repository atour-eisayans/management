import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { validatorOptions } from './validation/validator.options';
import { DatabaseExceptionFilter } from './filters/database.filter';

function documentConfig() {
  const config = new DocumentBuilder()
    .setTitle('Arm Stamp Management')
    .setDescription('This is my first try')
    .build();

  return config;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const swaggerDocument = SwaggerModule.createDocument(app, documentConfig());
  SwaggerModule.setup('api/documents', app, swaggerDocument);
  app.useGlobalPipes(new ValidationPipe(validatorOptions));
  app.useGlobalFilters(new DatabaseExceptionFilter());
  await app.listen(3000);
}
bootstrap();
