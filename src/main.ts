import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({   
    credentials: true,
    origin: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  
  const config = new DocumentBuilder()
  .setTitle('Tier test api')
  .setDescription('The tier test API description')
  .setVersion('1.0')
  .addTag('tier')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
