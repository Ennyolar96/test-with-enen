import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.use(helmet());
  app.enableCors();

  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.disable('x-powered-by');

  const config = new DocumentBuilder()
    .setTitle('Technical Testing')
    .setDescription(`V1 API description`)
    .setVersion('1.0')
    .setContact(
      'Olaniyan Mutiu',
      'https://www.github.com/ennyolar96',
      'olaniyanmutiu96@gmail.com',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const PORT = process.env.PORT || 8000;

  await app.listen(PORT);
}
bootstrap();
