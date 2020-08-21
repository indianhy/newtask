import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { DataService } from './data.service';
import { AuthGuard } from '@nestjs/passport'
import { Book, BookSchema } from './data.model';
import { Model } from 'mongoose'
import { from } from 'rxjs';

@Controller('/data')
export class DataController {

constructor(private readonly dataService: DataService) {}

@Post('/add')
@UseGuards(AuthGuard('jwt'))
async addData(
  @Body('username') username: string,
  @Body('password') password: string,
  @Body('name') name: string,
  @Body('address') address: string,
  @Body('age') age: number,
  ) {
    const generatedId = await this.dataService.addData(
      username,
      password,
      name,
      address,
      age,
    );
    return { id: generatedId };
  }

  @Get('/all')
  async getAllData() {
    const data = await this.dataService.getAllData();
    return data;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getData(@Param('id') dataId: string) {
    return this.dataService.getSingleData(dataId);
  }

  @Patch('/update')
  @UseGuards(AuthGuard('jwt'))
  async updateData(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('age') age: number,
  ) {
    await this.dataService.updateData(id, name, address, age);
    return null;
  }

  @Patch('/addbook')
  @UseGuards(AuthGuard('jwt'))
  async addBookAtId(
    @Body('id') id: string,
    @Body('title') title: string,
    @Body('genre') genre: string,
  ) {
    const book= {title:title,genre:genre}
    await this.dataService.addBookAtId(id, book);
    return null;
  }

  @Patch('/updatebook')
  @UseGuards(AuthGuard('jwt'))
  async updateBookAtId(
    @Body('id') id: string,
    @Body('title') title: string,
    @Body('genre') genre: string,
  ) {
    const book= {title:title,genre:genre}
    await this.dataService.updateBookAtId(id, book);
    return null;
  }

  @Patch('/delbook')
  @UseGuards(AuthGuard('jwt'))
  async deleteBookAtId(
    @Body('id') id: string,
    @Body('title') title: string,
  ) {
    await this.dataService.deleteBookAtId(id, title);
    return null;
  }

  @Delete('/delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteData(@Body('id') dataId: string) {
      await this.dataService.deleteData(dataId);
      return null;
  }

}
