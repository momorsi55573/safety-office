import { Module } from '@nestjs/common';
import { PermitController } from './permit.controller';
import { PermitService } from './permit.service';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  controllers: [PermitController],
  providers: [CloudinaryProvider, PermitService],
})
export class PermitModule {}
