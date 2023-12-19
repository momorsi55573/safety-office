import { Controller, Get, Render, UseFilters, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtGuard } from 'src/utils/guards';
import { GetUser } from './utils/decorators';
import { ViewAuthFilter } from './utils/decorators/filter.decorator';

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
  @UseFilters(ViewAuthFilter)
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
