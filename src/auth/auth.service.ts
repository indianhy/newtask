import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';

import { DataService } from '../shared/data.service';
import { Payload } from './data.model';

@Injectable()
export class AuthService {
  constructor(private dataService: DataService) {}

  async signPayload(payload: Payload) {
    return sign(payload, 'thisissecret', { expiresIn: '12h' });
  }

  async validateUser(payload: Payload) {
    return await this.dataService.findByPayload(payload);
  }
}