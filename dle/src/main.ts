import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.init();

  } catch (error: unknown) {
    Logger.error(`❌ Error starting server: ${(error as Error).message}`, (error as Error).stack);
  }
}

bootstrap();
