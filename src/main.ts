import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './shared/transform.interceptor';
import { HttpExceptionFilter } from './shared/http-execption.filter';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? path.resolve(process.cwd(), '..', '.env')
      : path.resolve(process.cwd(), '.env.development'),
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  const options = new DocumentBuilder()
    .setTitle('blog-serve')
    .setDescription('接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger-doc', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });
  await app.listen(3000);
}
bootstrap();
