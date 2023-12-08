import { PermitService } from './permit.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser, Roles } from 'src/utils/decorators';
import { CreatePermitDto } from 'src/utils/dto';
import { JwtGuard, RolesGuard } from 'src/utils/guards';
import { Request, Response } from 'express';
import { Role } from '@prisma/client';

@Controller('permit')
export class PermitController {
  constructor(private PermitService: PermitService) {}

  @Get('createPermit')
  @Render('createPermit')
  createPermit() {
    return;
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ENG)
  @Get('myPermits')
  @Render('myPermits')
  myPermits() {
    return;
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ENG)
  @Post('creatPermit')
  @UseInterceptors(FileInterceptor('file'))
  addPermit(
    @Body() dto: CreatePermitDto,
    @GetUser() user,
    @UploadedFile() file,
    @Res({ passthrough: true }) res: Response,
  ) {
    this.PermitService.addPermit(dto, user, file);
    res.redirect('http://localhost:3000/permit');
  }
}
