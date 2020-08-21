import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    SharedModule
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {} 
