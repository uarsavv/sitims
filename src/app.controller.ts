import { Controller, Render, Get, Res, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ResponseTimeInterceptor } from './interceptor';

@Controller()
@UseInterceptors(ResponseTimeInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  root() {}

  @Get('/index')
  @Render('index')
  index(@Res() res: Response) {
    return res.render('index.hbs', {
      isAuthenticated: false,
      responseTime: String(res.locals.responseTime),
    });
  }

  @Get('/katalog')
  @Render('katalog')
  registration(@Res() res: Response) {
    return res.render('Katalog.hbs', {
      isKatalog: true,
      responseTime: String(res.locals.responseTime),
    });
  }

  @Get('/registrPage')
  @Render('registrPage')
  registrPage(@Res() res: Response) {
    return res.render('registrPage.hbs', {
      isregistrPage: true,
      responseTime: String(res.locals.responseTime),
    });
  }

  @Get('/cooperation')
  @Render('cooperation')
  cooperation(@Res() res: Response) {
    return res.render('cooperation.hbs', {
      iscooperation: true,
      responseTime: String(res.locals.responseTime),
    });
  }
}
