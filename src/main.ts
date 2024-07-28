import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { Logger, ValidationPipe } from '@nestjs/common';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FE_URL,
    credentials: true,
  });
  app.use(cookieParser());
  // Apply the global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, // This will throw an error if there are unexpected properties in the body
    }),
  );
  const logger = new Logger('HTTP');
  app.use((req, res, next) => {
    logger.log(`Incoming request: ${req.method} ${req.url}`);
    next();
  });
  await app.listen(3001);
}
bootstrap();
