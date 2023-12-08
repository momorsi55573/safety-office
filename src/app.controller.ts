import { Controller, Get, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from 'src/utils/guards';
import { GetUser } from './utils/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('signin')
  signin() {
    return;
  }

  @UseGuards(JwtGuard)
  @Get('home')
  @Render('home')
  home(@GetUser() user: { userId: string; role }) {
    return { user };
  }

  @Get('createUser')
  @Render('createUser')
  createUser() {
    return;
  }
}
