import { GetUser, Roles } from 'src/utils/decorators';
import { AuthDto, CreateUserDto } from '../utils/dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../utils/guards/jwt.guard';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/utils/guards';
import { Request, Response } from 'express';

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
    res
      .cookie('access_token', access_token, {
        httpOnly: true,
      })
      .redirect('http://localhost:3000/home');
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('creatUser')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.creatuser(dto);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  getProfile(@GetUser() user: { userId: string; role: Role }) {
    return user;
  }

  @Get('logout')
  async logout(req: Request, res: Response) {
    res
      .cookie('access_token', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
      })
      .redirect('/');
  }
}
