// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PermitService } from './permit.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Render,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/utils/decorators';
import { CreatePermitDto } from 'src/utils/dto';
import { JwtGuard, RolesGuard } from 'src/utils/guards';
import { Response } from 'express';
import { Role } from '@prisma/client';

@Controller('permit')
export class PermitController {
  constructor(private PermitService: PermitService) {}
  @UseGuards(JwtGuard, RolesGuard)
  @Get('createPermit')
  @Render('createPermit')
  createPermit() {
    return;
  }

  @UseGuards(JwtGuard)
  @Get('myPermits')
  @Render('myPermits')
  async myPermits(
    @GetUser() user: { userId: string; role: Role; company: string },
  ) {
    const allPermits = (await this.PermitService.getAllPermits()).reverse();
    const myPermits = (
      await this.PermitService.getMyPermits(user.userId)
    ).reverse();
    const companyPermits = (
      await this.PermitService.getCompanyPermits(user.company)
    ).reverse();
    return { user, allPermits, myPermits, companyPermits };
  }

  @UseGuards(JwtGuard)
  @Get('searchPermits')
  @Render('searchPermits')
  async searchPermits(
    @Query('term') date: string,
    @GetUser() user: { userId: string; role: Role; company: string },
  ) {
    const allPermits = (
      await this.PermitService.searchAllhPermits(date)
    ).reverse();
    const myPermits = (
      await this.PermitService.searchMyPermits(user.userId, date)
    ).reverse();
    const companyPermits = (
      await this.PermitService.searchCompanyPermits(user.company, date)
    ).reverse();
    return { user, allPermits, myPermits, companyPermits };
  }

  @UseGuards(JwtGuard)
  @Get('pendingPermits')
  @Render('pendingPermits')
  async pendingPermits(
    @GetUser() user: { userId: string; role: Role; company: string },
  ) {
    const allPermits = (
      await this.PermitService.pendingAllhPermits()
    ).reverse();
    const myPermits = (
      await this.PermitService.pendingMyPermits(user.userId)
    ).reverse();
    const companyPermits = (
      await this.PermitService.pendingCompanyPermits(user.userId)
    ).reverse();
    return { user, allPermits, myPermits, companyPermits };
  }

  @UseGuards(JwtGuard)
  @Get('activePermits')
  @Render('activePermits')
  async activePermits(
    @GetUser() user: { userId: string; role: Role; company: string },
  ) {
    const allPermits = (await this.PermitService.activeAllhPermits()).reverse();
    const myPermits = (
      await this.PermitService.activeMyPermits(user.userId)
    ).reverse();
    const companyPermits = (
      await this.PermitService.activeCompanyPermits(user.userId)
    ).reverse();
    return { user, allPermits, myPermits, companyPermits };
  }

  @UseGuards(JwtGuard)
  @Get('stoppedPermits')
  @Render('stoppedPermits')
  async stoppedPermits(
    @GetUser() user: { userId: string; role: Role; company: string },
  ) {
    const allPermits = (await this.PermitService.stoppedAllPermits()).reverse();
    const myPermits = (
      await this.PermitService.stoppedMyPermits(user.userId)
    ).reverse();
    const companyPermits = (
      await this.PermitService.stoppedCompanyPermits(user.userId)
    ).reverse();
    return { user, allPermits, myPermits, companyPermits };
  }

  @UseGuards(JwtGuard)
  @Get('thisPermit/:id')
  @Render('thisPermit')
  async thisPermit(
    @Param('id') id: string,
    @GetUser()
    user: { userId: string; role: Role; company: string },
  ) {
    const permit = await this.PermitService.getPermit(id);
    return { user, permit };
  }

  @UseGuards(JwtGuard)
  @Get('approve/:id')
  async approve(
    @Param('id') id: string,
    @GetUser()
    user: { userId: string; role: Role; company: string; userName: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.approve(id, user);
    res.redirect('http://localhost:3000/home');
  }

  @UseGuards(JwtGuard)
  @Get('reject/:id')
  async reject(
    @Param('id') id: string,
    @GetUser()
    user: { userId: string; role: Role; company: string; userName: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.reject(id, user);
    res.redirect('http://localhost:3000/home');
  }

  @UseGuards(JwtGuard)
  @Get('stop/:id')
  async stop(
    @Param('id') id: string,
    @GetUser()
    user: { userId: string; role: Role; company: string; userName: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.stop(id, user);
    res.redirect('http://localhost:3000/home');
  }

  @UseGuards(JwtGuard)
  @Post('creatPermit')
  @UseInterceptors(FilesInterceptor('file'))
  async addPermit(
    @Body() dto: CreatePermitDto,
    @GetUser() user,
    @UploadedFiles() file,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.addPermit(dto, user, file);
    res.redirect('http://localhost:3000/home');
  }
}
