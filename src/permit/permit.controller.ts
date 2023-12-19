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
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/utils/decorators';
import { JwtGuard } from 'src/utils/guards';
import { Response } from 'express';
import { ViewAuthFilter } from 'src/utils/decorators/filter.decorator';

@Controller('permit')
export class PermitController {
  constructor(private PermitService: PermitService) {}
  @UseGuards(JwtGuard)
  @Get('createPermit')
  @UseFilters(ViewAuthFilter)
  @Render('createPermit')
  createPermit() {
    return;
  }

  @UseGuards(JwtGuard)
  @Get('coldWorkPermit')
  @UseFilters(ViewAuthFilter)
  @Render('coldWorkPermit')
  coldWorkPermit() {
    return;
  }

  @UseGuards(JwtGuard)
  @Post('extend/:id')
  async extend(
    @Param('id') id: string,
    @Body() dto,
    @GetUser() user,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.extend(id, dto, user);
    return res.redirect('../myPermits');
  }

  @UseGuards(JwtGuard)
  @Post('addTest/:id')
  async addTest(
    @Param('id') id: string,
    @Body() dto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.addTest(id, dto);
    return res.redirect('../myPermits');
  }

  @UseGuards(JwtGuard)
  @Post('renew/:id')
  async renew(
    @Param('id') id: string,
    @Body() dto,
    @GetUser() user,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.renew(id, dto, user);
    return res.redirect('../myPermits');
  }

  @UseGuards(JwtGuard)
  @Post('createColdWorkPermit')
  @UseInterceptors(FilesInterceptor('file'))
  async createColdWorkPermit(
    @Body() dto,
    @GetUser() user,
    @UploadedFiles() file,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.createColdWorkPermit(dto, user, file);
    res.redirect('/home');
  }

  @UseGuards(JwtGuard)
  @Get('confinedSpaceEntryPermit')
  @UseFilters(ViewAuthFilter)
  @Render('confinedSpaceEntryPermit')
  confinedSpaceEntryPermit() {
    return;
  }

  @UseGuards(JwtGuard)
  @Post('createConfinedSpaceEntryPermit')
  @UseInterceptors(FilesInterceptor('file'))
  async createConfinedSpaceEntryPermit(
    @Body() dto,
    @GetUser() user,
    @UploadedFiles() file,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.createConfinedSpaceEntryPermit(dto, user, file);
    res.redirect('/home');
  }

  @UseGuards(JwtGuard)
  @Get('electerecalWorkPermit')
  @UseFilters(ViewAuthFilter)
  @Render('electerecalWorkPermit')
  electerecalWorkPermit() {
    return;
  }

  @UseGuards(JwtGuard)
  @Post('createElecterecalWorkPermit')
  @UseInterceptors(FilesInterceptor('file'))
  async createElecterecalWorkPermit(
    @Body() dto,
    @GetUser() user,
    @UploadedFiles() file,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.createElecterecalWorkPermit(dto, user, file);
    res.redirect('/home');
  }

  @UseGuards(JwtGuard)
  @Get('excavationWorkPermit')
  @UseFilters(ViewAuthFilter)
  @Render('excavationWorkPermit')
  excavationWorkPermit() {
    return;
  }

  @UseGuards(JwtGuard)
  @Post('createExcavationWorkPermit')
  @UseInterceptors(FilesInterceptor('file'))
  async createExcavationWorkPermit(
    @Body() dto,
    @GetUser() user,
    @UploadedFiles() file,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.createExcavationWorkPermit(dto, user, file);
    res.redirect('/home');
  }

  @UseGuards(JwtGuard)
  @Get('hotWorkPermit')
  @UseFilters(ViewAuthFilter)
  @Render('hotWorkPermit')
  hotWorkPermit() {
    return;
  }

  @UseGuards(JwtGuard)
  @Post('createHotWorkPermit')
  @UseInterceptors(FilesInterceptor('file'))
  async createHotWorkPermit(
    @Body() dto,
    @GetUser() user,
    @UploadedFiles() file,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.createHotWorkPermit(dto, user, file);
    res.redirect('/home');
  }

  @UseGuards(JwtGuard)
  @Get('myPermits')
  @UseFilters(ViewAuthFilter)
  @Render('myPermits')
  async myPermits(@GetUser() user: { userId: string; role; company: string }) {
    await this.PermitService.expire();
    const myPermits = (
      await this.PermitService.getMyPermits(user.userId)
    ).reverse();
    const allPermits = (await this.PermitService.getAllPermits()).reverse();
    const companyPermits = (
      await this.PermitService.getCompanyPermits(user.company)
    ).reverse();
    return { user, allPermits, myPermits, companyPermits };
  }

  @UseGuards(JwtGuard)
  @Get('searchPermits')
  @UseFilters(ViewAuthFilter)
  @Render('searchPermits')
  async searchPermits(
    @Query('term') date: string,
    @GetUser() user: { userId: string; role; company: string },
  ) {
    const allPermits = (
      await this.PermitService.searchAllPermits(date)
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
  @UseFilters(ViewAuthFilter)
  @Render('pendingPermits')
  async pendingPermits(
    @GetUser() user: { userId: string; role; company: string },
  ) {
    const allPermits = (await this.PermitService.pendingAllPermits()).reverse();
    const myPermits = (
      await this.PermitService.pendingMyPermits(user.userId)
    ).reverse();
    const companyPermits = (
      await this.PermitService.pendingCompanyPermits(user.userId)
    ).reverse();
    return { user, allPermits, myPermits, companyPermits };
  }

  @UseGuards(JwtGuard)
  @Get('expiredPermits')
  @UseFilters(ViewAuthFilter)
  @Render('expiredPermits')
  async expiredPermits(
    @GetUser() user: { userId: string; role; company: string },
  ) {
    const allPermits = (await this.PermitService.expiredAllPermits()).reverse();
    const myPermits = (
      await this.PermitService.expiredMyPermits(user.userId)
    ).reverse();
    const companyPermits = (
      await this.PermitService.expiredCompanyPermits(user.userId)
    ).reverse();
    return { user, allPermits, myPermits, companyPermits };
  }

  @UseGuards(JwtGuard)
  @Get('activePermits')
  @UseFilters(ViewAuthFilter)
  @Render('activePermits')
  async activePermits(
    @GetUser() user: { userId: string; role; company: string },
  ) {
    const allPermits = (await this.PermitService.activeAllPermits()).reverse();
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
  @UseFilters(ViewAuthFilter)
  @Render('stoppedPermits')
  async stoppedPermits(
    @GetUser() user: { userId: string; role; company: string },
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
  @UseFilters(ViewAuthFilter)
  @Render('thisPermit')
  async thisPermit(
    @Param('id') id: string,
    @GetUser()
    user: { userId: string; role; company: string },
  ) {
    const extend = await this.PermitService.ex(id);
    const renew = await this.PermitService.re(id);
    const test = await this.PermitService.getTest(id);
    const permit = await this.PermitService.getPermit(id);
    return { user, permit, test, extend, renew };
  }

  @UseGuards(JwtGuard)
  @Get('approve/:id')
  async approve(
    @Param('id') id: string,
    @GetUser()
    user: { userId: string; role; company: string; userName: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.approve(id, user);
    res.redirect('/home');
  }

  @UseGuards(JwtGuard)
  @Get('reject/:id')
  async reject(
    @Param('id') id: string,
    @GetUser()
    user: { userId: string; role; company: string; userName: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.reject(id, user);
    res.redirect('/home');
  }

  @UseGuards(JwtGuard)
  @Get('approveEX/:id')
  async approveEX(
    @Param('id') id: string,
    @GetUser()
    user: { userId: string; role; company: string; userName: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.approveEX(id, user);
    res.redirect('/home');
  }

  @UseGuards(JwtGuard)
  @Get('rejectEX/:id')
  async rejectEX(
    @Param('id') id: string,
    @GetUser()
    user: { userId: string; role; company: string; userName: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.rejectEX(id, user);
    res.redirect('/home');
  }

  @UseGuards(JwtGuard)
  @Get('approveRE/:id')
  async approveRE(
    @Param('id') id: string,
    @GetUser()
    user: { userId: string; role; company: string; userName: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.approveRE(id, user);
    res.redirect('/home');
  }

  @UseGuards(JwtGuard)
  @Get('rejectRE/:id')
  async rejectRE(
    @Param('id') id: string,
    @GetUser()
    user: { userId: string; role; company: string; userName: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.rejectRE(id, user);
    res.redirect('/home');
  }

  @UseGuards(JwtGuard)
  @Get('stop/:id')
  async stop(
    @Param('id') id: string,
    @GetUser()
    user: { userId: string; role; company: string; userName: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.PermitService.stop(id, user);
    res.redirect('/home');
  }
}
