import { Body, Controller, Post, Get } from '@nestjs/common';

import { DataService } from '../shared/data.service';
import { Login, Data, Payload } from './data.model';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private dataService: DataService,
    private authService: AuthService,
  ) {}

  @Post('/login')
  async login(@Body() userDTO: Login) {
    const user = await this.dataService.findByLogin(userDTO);
    const payload: Payload = { 
      username: user.username
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('/register')
  async register(@Body() userDTO: Data) {
    const user = await this.dataService.create(userDTO);
    const payload: Payload = {
      username: user.username
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  } 
}