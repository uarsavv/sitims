import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as process from 'process';
import * as hbs from 'express-handlebars';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'dotenv';
config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setViewEngine('hbs');
  app.engine(
    'hbs',
    hbs.engine({
      extname: 'hbs',
      partialsDir: join(__dirname, '..', 'views/partials'),
      defaultLayout: 'main',
      layoutsDir: join(__dirname, '..', 'views/layouts'),
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Project documentation')
    .setDescription('The projects API description')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const documentation = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentation);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
