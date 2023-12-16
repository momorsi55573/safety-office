import { Roles } from 'src/utils/decorators';
import { AuthDto, CreateUserDto } from '../utils/dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../utils/guards/jwt.guard';
import { RolesGuard } from 'src/utils/guards';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.signin(dto);
    if (
      access_token === 'user incorrect' ||
      access_token === 'password incorrect'
    ) {
      res.redirect('/');
    } else {
      res.cookie('access_token', access_token).redirect('/home');
    }
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('Admin')
  @Post('creatUser')
  signup(
    @Body() dto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.creatuser(dto);
    return res.redirect('/home');
  }

  @Get('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res
      .cookie('access_token', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
      })
      .redirect('/');
  }
}
