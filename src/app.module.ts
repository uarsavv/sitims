import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UserModule } from './User/user.module';
import { AlphabetModule } from './Alphabet/alphabet.module';
import { TextModule } from './Text/text.module';
import { LetterModule } from './Letter/letter.module';
import { TranslationModule } from './Translation/translation.module';
import { ResponseTimeInterceptor } from './interceptor';
import { PrismaService } from './prisma.service';
import { AuthModule } from './Auth/auth.module';
import { AuthService } from './Auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'views'),
    }),
    UserModule,
    AlphabetModule,
    TextModule,
    LetterModule,
    TranslationModule,
    AuthModule,
    JwtModule.register({}),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService, ResponseTimeInterceptor],
})
export class AppModule {}
