import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port =
    process.env.PORT ||
    (() => {
      throw new Error('❌ PORT environment variable is not defined');
    })();

  const mode =
    process.env.NODE_ENV ||
    (() => {
      throw new Error('❌ NODE_ENV environment variable is not defined');
    })();

  Logger.log(`🚀 Server is running in ${mode} mode`);
  // Swagger документация (только для development)
  // if (mode === 'development') {
  const config = new DocumentBuilder().setTitle('API Documentation').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  Logger.log(`📚 Swagger documentation available at: http://localhost:${port}/docs`);
  // }


  await app.listen(port);
  Logger.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();

