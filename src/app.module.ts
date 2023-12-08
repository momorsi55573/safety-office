import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PermitModule } from './permit/permit.module';

@Module({
  imports: [DbModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule, PermitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
