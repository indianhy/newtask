import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { DataService } from './data.service';
import { Book, BookSchema } from './data.model';
import { Model } from 'mongoose'

@Controller('/data')
export class DataController {

constructor(private readonly dataService: DataService) {}

@Post('/add')
async addData(
    @Body('name') name: string,
    @Body('address') address: string,
    @Body('age') age: number,
  ) {
    const generatedId = await this.dataService.addData(
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
  getData(@Param('id') dataId: string) {
    return this.dataService.getSingleData(dataId);
  }

  @Patch('/update')
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
  async deleteBookAtId(
    @Body('id') id: string,
    @Body('title') title: string,
  ) {
    await this.dataService.deleteBookAtId(id, title);
    return null;
  }

  @Delete('/delete')
  async deleteData(@Body('id') dataId: string) {
      await this.dataService.deleteData(dataId);
      return null;
  }

}
