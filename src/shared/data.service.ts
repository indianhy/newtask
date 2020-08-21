import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Login, Data, Payload } from './data.model'; 

@Injectable()
export class DataService {
  constructor(@InjectModel('Data') private userModel: Model<Data>) {}

  async create(userDTO: Data) {
    const { username } = userDTO;
    const user = await this.userModel.findOne({ username });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = new this.userModel(userDTO);
    await createdUser.save();
    return createdUser;
  }

  async find() {
    return await this.userModel.find();
  }

  async findByLogin(userDTO: Login) {
    const { username, password } = userDTO;
    const user = await this.userModel
      .findOne({ username });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    if (password===user.password) {
      return user
    } else {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: Payload) {
    const { username } = payload;
    return await this.userModel.findOne({ username });
  }

}