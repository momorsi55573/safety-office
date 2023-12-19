import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { Response } from 'express';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, Response],
})
export class AuthModule {}
