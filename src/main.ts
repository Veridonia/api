import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { Logger } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FE_URL,
    credentials: true,
  });
  app.use(cookieParser());
  const logger = new Logger('HTTP');
  app.use((req, res, next) => {
    logger.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });
  await app.listen(3001);
}
bootstrap();
